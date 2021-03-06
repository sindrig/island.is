import React, { FC } from 'react'
import { ExternalDataProviderScreen } from '../types'
import {
  Box,
  Checkbox,
  Icon,
  InputError,
  Text,
} from '@island.is/island-ui/core'
import {
  DataProviderItem,
  DataProviderResult,
  ExternalData,
  FormValue,
  getValueViaPath,
} from '@island.is/application/core'
import { useMutation } from '@apollo/client'
import { UPDATE_APPLICATION_EXTERNAL_DATA } from '@island.is/application/graphql'
import { Controller, useFormContext } from 'react-hook-form'
import { useLocale } from '@island.is/localization'

const ProviderItem: FC<{
  dataProviderResult: DataProviderResult
  provider: DataProviderItem
}> = ({ dataProviderResult = {}, provider }) => {
  const { subTitle, title } = provider
  const { formatMessage } = useLocale()
  return (
    <Box marginBottom={3}>
      <Text variant="h4" color="blue400">
        {formatMessage(title)}
      </Text>
      {subTitle && <Text>{formatMessage(subTitle)}</Text>}
      {dataProviderResult?.status === 'failure' && (
        <InputError
          errorMessage={dataProviderResult?.reason}
          id={provider.id}
        />
      )}
    </Box>
  )
}

const FormExternalDataProvider: FC<{
  applicationId: string
  addExternalData(data: ExternalData): void
  externalData: ExternalData
  externalDataProvider: ExternalDataProviderScreen
  formValue: FormValue
}> = ({
  addExternalData,
  applicationId,
  externalData,
  externalDataProvider,
  formValue,
}) => {
  const { setValue } = useFormContext()
  const [updateExternalData] = useMutation(UPDATE_APPLICATION_EXTERNAL_DATA, {
    onCompleted({ updateApplicationExternalData }) {
      addExternalData(updateApplicationExternalData.externalData)
    },
  })

  const { id, dataProviders } = externalDataProvider
  const label = 'Ég samþykki'
  return (
    <Box>
      <Box
        marginTop={2}
        marginBottom={5}
        display="flex"
        alignItems="center"
        justifyContent="flexStart"
      >
        <Box marginRight={1}>
          <Icon icon="download" size="medium" color="blue400" type="outline" />
        </Box>
        <Text variant="h4">
          Eftirfarandi gögn verða sótt rafrænt með þínu samþykki
        </Text>
      </Box>
      <Box marginBottom={5}>
        {dataProviders.map((provider) => (
          <ProviderItem
            provider={provider}
            key={provider.id}
            dataProviderResult={externalData[provider.id]}
          />
        ))}
      </Box>
      <Controller
        name={`${id}`}
        defaultValue={getValueViaPath(formValue, id as string, false)}
        rules={{ required: true }}
        render={({ value, onChange }) => {
          return (
            <>
              <Box
                background="blue100"
                display="flex"
                padding={4}
                borderRadius="large"
                marginTop={1}
                key={`${id}`}
              >
                <Checkbox
                  onChange={(e) => {
                    onChange(e.target.checked)
                    setValue(id as string, e.target.checked)

                    // TODO: Move this to the continue button click
                    if (e.target.checked) {
                      updateExternalData({
                        variables: {
                          input: {
                            id: applicationId,
                            dataProviders: dataProviders.map(
                              ({ id, type }) => ({
                                id,
                                type,
                              }),
                            ),
                          },
                        },
                      })
                    }
                  }}
                  checked={value}
                  name={`${id}`}
                  label={label}
                  value={id}
                />
              </Box>
            </>
          )
        }}
      />
    </Box>
  )
}

export default FormExternalDataProvider
