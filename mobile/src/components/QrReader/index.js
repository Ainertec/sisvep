import React, { useState, useEffect, useRef } from 'react'
import { Text, Dimensions, Switch } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'

import * as Animatable from 'react-native-animatable'

import { Container } from './styles'

const windownHeader = Dimensions.get('window').height

const QrReader = ({ cameraSide, setReadedCode, formRef }) => {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)
  const scannerRef = useRef(null)

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

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState)
  }

  const AnimatableScanner = Animatable.createAnimatableComponent(BarCodeScanner)

  return (
    <Container>
      {isEnabled && (
        <AnimatableScanner
          ref={scannerRef}
          delay={250}
          animation={isEnabled ? 'fadeIn' : 'fadeOut'}
          useNativeDriver
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
      )}
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? 'blue' : '#f4f3f4'}
        ios_backgroundColor='#3e3e3e'
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </Container>
  )
}

export default QrReader
