import {
  CaseCustodyRestrictions,
  CaseGender,
} from '@island.is/judicial-system/types'

import * as Constants from './constants'
import {
  formatDate,
  formatCustodyRestrictions,
  capitalize,
  formatGender,
  formatRestrictions,
} from './formatters'

describe('formatDate', () => {
  test('should return undefined if date parameter is undefined', () => {
    // Arrange
    const date2 = undefined

    // Act
    const time2 = formatDate(date2, Constants.TIME_FORMAT)

    // Assert
    expect(time2).toBeUndefined()
  })

  test('should return the time with 24h format', () => {
    // Arrange
    const date = '2020-09-10T09:36:57.287Z'
    const date2 = '2020-09-23T23:36:57.287Z'

    // Act
    const time = formatDate(date, Constants.TIME_FORMAT)
    const time2 = formatDate(date2, Constants.TIME_FORMAT)

    // Assert
    expect(time).toEqual('09:36')
    expect(time2).toEqual('23:36')
  })
})

describe('renderRestrictions', () => {
  test('should return a comma separated list of restrictions', () => {
    // Arrange
    const restrictions: CaseCustodyRestrictions[] = [
      CaseCustodyRestrictions.ISOLATION,
      CaseCustodyRestrictions.COMMUNICATION,
    ]

    // Act
    const r = formatCustodyRestrictions(restrictions)

    // Assert
    expect(r).toEqual('B - Einangrun, D - Bréfskoðun, símabann')
  })

  test('should return "Ekki er farið fram á takmarkanir á gæslu" if no custody restriction is supplyed', () => {
    // Arrange
    const restrictions: CaseCustodyRestrictions[] = []

    // Act
    const r = formatCustodyRestrictions(restrictions)

    // Assert
    expect(r).toEqual('Ekki er farið fram á takmarkanir á gæslu')
  })
})

describe('formatRestrictions', () => {
  test('should return formatted restrictions for no restrictions', () => {
    // Arrange
    const custodyRestrictions: Array<CaseCustodyRestrictions> = []

    // Act
    const res = formatRestrictions(custodyRestrictions)

    // Assert
    expect(res).toBe('Sækjandi tekur fram að gæsluvarðhaldið sé án takmarkana.')
  })

  test('should return formatted restrictions for isolation only', () => {
    // Arrange
    const custodyRestrictions = [CaseCustodyRestrictions.ISOLATION]

    // Act
    const res = formatRestrictions(custodyRestrictions)

    // Assert
    expect(res).toBe(
      'Sækjandi tekur fram að kærði skuli sæta einangrun meðan á gæsluvarðhaldi stendur.',
    )
  })

  test('should return formatted restrictions for isolation and one other restriction', () => {
    // Arrange
    const custodyRestrictions = [
      CaseCustodyRestrictions.ISOLATION,
      CaseCustodyRestrictions.MEDIA,
    ]

    // Act
    const res = formatRestrictions(custodyRestrictions)

    // Assert
    expect(res).toBe(
      'Sækjandi tekur fram að kærði skuli sæta einangrun meðan á gæsluvarðhaldi stendur og að gæsluvarðhaldið verði með fjölmiðlabanni skv. 99. gr. laga nr. 88/2008.',
    )
  })

  test('should return formatted restrictions for all but isolation', () => {
    // Arrange
    const custodyRestrictions = [
      CaseCustodyRestrictions.COMMUNICATION,
      CaseCustodyRestrictions.MEDIA,
      CaseCustodyRestrictions.VISITAION,
    ]

    // Act
    const res = formatRestrictions(custodyRestrictions)

    // Assert
    expect(res).toBe(
      'Sækjandi tekur fram að gæsluvarðhaldið verði með bréfaskoðun og símabanni, fjölmiðlabanni og heimsóknarbanni skv. 99. gr. laga nr. 88/2008.',
    )
  })

  test('should order non-isolation restrictions', () => {
    // Arrange
    const custodyRestrictions = [
      CaseCustodyRestrictions.MEDIA,
      CaseCustodyRestrictions.VISITAION,
      CaseCustodyRestrictions.COMMUNICATION,
    ]

    // Act
    const res = formatRestrictions(custodyRestrictions)

    // Assert
    expect(res).toBe(
      'Sækjandi tekur fram að gæsluvarðhaldið verði með bréfaskoðun og símabanni, fjölmiðlabanni og heimsóknarbanni skv. 99. gr. laga nr. 88/2008.',
    )
  })
})

describe('capitalize', () => {
  test('should return empty string if text is empty', () => {
    // Arrange
    const text = (undefined as unknown) as string

    // Act
    const r = capitalize(text)

    // Assert
    expect(r).toBe('')
  })
})

describe('formatGender', () => {
  test('should format male', () => {
    // Arrange
    const gender = CaseGender.MALE

    // Act
    const r = formatGender(gender)

    // Assert
    expect(r).toBe('karl')
  })

  test('should format female', () => {
    // Arrange
    const gender = CaseGender.FEMALE

    // Act
    const r = formatGender(gender)

    // Assert
    expect(r).toBe('kona')
  })

  test('should format other', () => {
    // Arrange
    const gender = CaseGender.OTHER

    // Act
    const r = formatGender(gender)

    // Assert
    expect(r).toBe('annað')
  })
})
