let speedFactor = 80
let pin_L = DigitalPin.P1
let pin_R = DigitalPin.P13
let whiteline = 1
let connected = 0
let strip = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB)
pins.setPull(pin_L, PinPullMode.PullNone)
pins.setPull(pin_R, PinPullMode.PullNone)
basic.showString("S")
radio.setGroup(77)
//  temporary code
// motor_run(100, 100); basic.pause(2000)
// motor_run(); basic.pause(300)
// motor_run(-100, -100, 60); basic.pause(2000)
// motor_run()
let autonomni = false
function motor_run(left: number = 0, right: number = 0, speed_factor: number = 80) {
    PCAmotor.MotorRun(PCAmotor.Motors.M1, Math.map(Math.constrain(left * (speedFactor / 100), -100, 100), -100, 100, -255, 255))
    PCAmotor.MotorRun(PCAmotor.Motors.M4, Math.map(Math.constrain(-1 * right * (speedFactor / 100), -100, 100), -100, 100, -255, 255))
}

basic.forever(function on_forever() {
    let l: any;
    let r: any;
    if (!autonomni) {
        l = (whiteline ^ pins.digitalReadPin(pin_L)) == 0 ? false : true
        r = (whiteline ^ pins.digitalReadPin(pin_R)) == 0 ? false : true
        if (pins.digitalReadPin(DigitalPin.P1) == 0 && pins.digitalReadPin(DigitalPin.P13) == 0) {
            motor_run(40, 40)
        }
        
        if (pins.digitalReadPin(DigitalPin.P1) == 0 && pins.digitalReadPin(DigitalPin.P13) == 1) {
            motor_run(-80, -40)
        }
        
        if (pins.digitalReadPin(DigitalPin.P1) == 1 && pins.digitalReadPin(DigitalPin.P13) == 0) {
            motor_run(-40, -80)
        }
        
        if (pins.digitalReadPin(DigitalPin.P1) == 1 && pins.digitalReadPin(DigitalPin.P13) == 1) {
            motor_run(-150, -150)
        }
        
        //  TO DO ...
        basic.pause(50)
    }
    
})
radio.onReceivedNumber(function on_received_number(receivedNumber: number) {
    
    if (receivedNumber == 5) {
        if (autonomni) {
            autonomni = false
        } else {
            autonomni = true
        }
        
    }
    
    if (receivedNumber == 0) {
        motor_run(150, 150)
    }
    
    if (receivedNumber == 1) {
        motor_run(-80, -80)
    }
    
    if (receivedNumber == 2) {
        motor_run(80, 40)
    }
    
    if (receivedNumber == 3) {
        motor_run(40, 80)
    }
    
    basic.pause(50)
})
