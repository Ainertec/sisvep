import React, { useState, useEffect } from 'react'
import { Text, Dimensions } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'

import { Container } from './styles'

const windownHeader = Dimensions.get('window').height

const QrReader = ({ cameraSide, setReadedCode, formRef }) => {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  useEffect(() => {
    async function getPermission() {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    }
    getPermission()
  }, [])

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true)
    setReadedCode(data)

    alert('Codigo de barras n: ' + data)

    setTimeout(() => {
      setScanned(false)
    }, 3000)
    formRef.current.setFieldValue('barcode', `${data}`)
  }

  if (hasPermission === null) {
    return <Text>É necessario permissão para acessar a camera!</Text>
  }
  if (hasPermission === false) {
    return <Text>Não é possivel acessar a camera!</Text>
  }
  return (
    <Container>
      <BarCodeScanner
        barCodeTypes={[
          BarCodeScanner.Constants.BarCodeType.ean13,
          BarCodeScanner.Constants.BarCodeType.ean8,
          BarCodeScanner.Constants.BarCodeType.code39,
        ]}
        type={'back'}
        type={cameraSide ? 'back' : 'front'}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{
          height: windownHeader * 0.4,
          marginTop: windownHeader * 0.04,
        }}
      />
    </Container>
  )
}

export default QrReader
