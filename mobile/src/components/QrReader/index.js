import React, { useState, useEffect, useRef } from 'react'
import { Text, Dimensions, Switch, Animated, Easing } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'

import { Container } from './styles'

const windownHeader = Dimensions.get('window').height

const QrReader = ({ cameraSide, setReadedCode, formRef }) => {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)

  const AnimatableScanner = Animated.createAnimatedComponent(BarCodeScanner)
  const scannerHeigth = new Animated.Value(0)
  const scannerHeigthRef = useRef(scannerHeigth)

  useEffect(() => {
    async function getPermission() {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    }
    getPermission()
  }, [])

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true)
    formRef.current.setFieldValue('barcode', `${data}`)
    // setReadedCode(data)

    // alert(`Código de barra: ${data}`)

    setTimeout(() => {
      setScanned(false)
    }, 1000)
  }

  if (hasPermission === null) {
    return <Text>É necessario permissão para acessar a camera!</Text>
  }
  if (hasPermission === false) {
    return <Text>Não é possivel acessar a camera!</Text>
  }

  const showAnimation = async () => {
    if (!isEnabled) {
      setIsEnabled((previousState) => !previousState)

      Animated.timing(scannerHeigthRef.current, {
        toValue: windownHeader * 0.4,
        duration: 1200,
        delay: 100,
        easing: Easing.in(Easing.elastic(1)),
      }).start()
    } else {
      Animated.timing(scannerHeigthRef.current, {
        toValue: 100,
        duration: 700,
        // delay: 100,
        // easing: Easing.out(Easing.exp),
      }).start(() => {
        setIsEnabled((previousState) => !previousState)
      })
    }
  }
  return (
    <Container>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? 'blue' : '#f4f3f4'}
        ios_backgroundColor='#3e3e3e'
        onValueChange={() => {
          showAnimation()
        }}
        value={isEnabled}
      />
      {isEnabled && (
        <AnimatableScanner
          barCodeTypes={[
            BarCodeScanner.Constants.BarCodeType.ean13,
            BarCodeScanner.Constants.BarCodeType.ean8,
            BarCodeScanner.Constants.BarCodeType.code39,
          ]}
          type={cameraSide ? 'back' : 'front'}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{
            height: scannerHeigthRef.current,
            marginTop: windownHeader * 0.04,
          }}
        />
      )}
    </Container>
  )
}

export default QrReader
