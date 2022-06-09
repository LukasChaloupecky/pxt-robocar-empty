speedFactor = 80
pin_L = DigitalPin.P1
pin_R = DigitalPin.P13
whiteline = 1
connected = 0
strip = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB)
pins.set_pull(pin_L, PinPullMode.PULL_NONE)
pins.set_pull(pin_R, PinPullMode.PULL_NONE)
basic.show_string("S")
radio.set_group(77)
# temporary code
#motor_run(100, 100); basic.pause(2000)
#motor_run(); basic.pause(300)
#motor_run(-100, -100, 60); basic.pause(2000)
#motor_run()
autonomni = False


def motor_run(left = 0, right = 0, speed_factor = 80):
    PCAmotor.motor_run(PCAmotor.Motors.M1, Math.map(Math.constrain(left * (speedFactor / 100), -100, 100), -100, 100, -255, 255))
    PCAmotor.motor_run(PCAmotor.Motors.M4, Math.map(Math.constrain(-1 * right * (speedFactor / 100), -100, 100), -100, 100, -255, 255))

okoli = 0
linie = 1
def on_forever():
    if not autonomni:
        l = False if (whiteline ^ pins.digital_read_pin(pin_L)) == 0 else True
        r = False if (whiteline ^ pins.digital_read_pin(pin_R)) == 0 else True
    
        if pins.digital_read_pin(DigitalPin.P1) == okoli and pins.digital_read_pin(DigitalPin.P13) == okoli:
            motor_run(50, 50)

        elif pins.digital_read_pin(DigitalPin.P1) == okoli and pins.digital_read_pin(DigitalPin.P13) == linie:
            motor_run(-180, -51)
        elif pins.digital_read_pin(DigitalPin.P1) == linie and pins.digital_read_pin(DigitalPin.P13) == okoli:
            motor_run(-51, -180)
        elif pins.digital_read_pin(DigitalPin.P1) == linie and pins.digital_read_pin(DigitalPin.P13) == linie:
            motor_run(-181, -181)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    
        basic.pause(40)
basic.forever(on_forever)




def on_received_number(receivedNumber):
    global autonomni
    if receivedNumber == 5:
        if autonomni:
            autonomni = False
        else:
            autonomni = True
    if receivedNumber == 0:
        motor_run(80, 80)
    if receivedNumber == 1:
        motor_run(-80, -80)
    if receivedNumber == 2:
        motor_run(-40, -80)
    if receivedNumber == 3:
        motor_run(-80, -40)
    basic.pause(50)
radio.on_received_number(on_received_number)