import React from 'react'
import {
  InfoScreen,
  ServicePortalModuleComponent,
} from '@island.is/service-portal/core'
import { defineMessage } from 'react-intl'
import { useNamespaces } from '@island.is/localization'

export const AssetsOverview: ServicePortalModuleComponent = () => {
  useNamespaces(['service.portal', 'sp.assets'])

  return (
    <InfoScreen
      title={defineMessage({
        id: 'sp.assets:title',
        defaultMessage: 'Eignir',
      })}
      intro={defineMessage({
        id: 'sp.assets:intro',
        defaultMessage: `Hér eru upplýsingar um það sem kemur til með að koma inn undir
        fjármál á næstunni.`,
      })}
      list={{
        title: defineMessage({
          id: 'service.portal:incoming',
          defaultMessage: 'Á döfinni',
        }),
        items: [
          defineMessage({
            id: 'sp.assets:inc-1',
            defaultMessage:
              'Yfirlit og hægt verður að greiða öll opinber gjöld',
          }),
          defineMessage({
            id: 'sp.assets:inc-2',
            defaultMessage: 'Ganga frá skattskýrsla og sjá eldi skattskýrslur',
          }),
          defineMessage({
            id: 'sp.assets:inc-3',
            defaultMessage: 'Sjá yfirlit og ráðstafa séreignarsparnaði',
          }),
        ],
      }}
      institutionTitle={defineMessage({
        id: 'sp.assets:institution',
        defaultMessage: 'Samgöngustofa',
      })}
      institutionDescription={defineMessage({
        id: 'sp.assets:institution-description',
        defaultMessage: `
          Vinnumálastofnun heyrir undir félagsmálráðuneytið og fer m.a. með
          yfirstjórn vinnumiðlunar í landinu og daglega afgreiðslu
          Atvinnuleysistryggingasjóðs, Fæðingarorlofssjóðs, Ábyrgðarsjóðs
          launa auk fjölmargra annara vinnumarkaðstengdra verkefna.
        `,
      })}
      institutionHref="https://www.samgongustofa.is/"
      institutionLinkTitle={defineMessage({
        id: 'sp.assets:institution-link-title',
        defaultMessage: 'Vefur samgöngustofu - www.samgongustofa.is/',
      })}
      figure="/assets/images/bedroom.jpg"
    />
  )
}

export default AssetsOverview
