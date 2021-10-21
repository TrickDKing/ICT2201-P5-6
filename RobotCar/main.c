/*******************************************************************************
 * MSP432 Timer_A - Variable PWM
 *
 * Description: In this example, the Timer_A module is used to create a precision
 * PWM with an adjustable duty cycle. The PWM initial period is 80 ms and is
 * output on P2.4 and P2.5. The initial duty cycle of the PWM is 10%, however when the
 * button is pressed on P1.1 the duty cycle is sequentially increased by 10%.
 * Once the duty cycle reaches 90%, the duty cycle is reset to 10% on the
 * following button press.
 *
 *                MSP432P401
 *             ------------------
 *         /|\|                  |
 *          | |                  |
 *          --|RST         P1.1  |<--Toggle Switch for output PWN ON P2.4
 *            |            P1.4  |<--Toggle Switch for output PWM ON P2.5
 *            |                  |
 *            |            P2.4  |--> Output PWM for left motor
 *            |            P2.5  |--> Output PWM for right motor
 *            |                  |
 *
 *******************************************************************************/
/* DriverLib Includes */
#include <ti/devices/msp432p4xx/driverlib/driverlib.h>

/* Timer_A PWM Configuration Parameter */
// Configure for the left motor
Timer_A_PWMConfig pwmConfig =
{
        // Move the left wheel
        TIMER_A_CLOCKSOURCE_SMCLK,
        TIMER_A_CLOCKSOURCE_DIVIDER_24,
        10000,
        // For Port2.4 as it is TA_0.1
        TIMER_A_CAPTURECOMPARE_REGISTER_1,
        TIMER_A_OUTPUTMODE_RESET_SET,
        1000
};

//Configure for the right motor
Timer_A_PWMConfig pwmConfig2 =
{
        // Move the right wheel
        // Need to increase the PWM for right motor as it is moving slower
        TIMER_A_CLOCKSOURCE_SMCLK,
        TIMER_A_CLOCKSOURCE_DIVIDER_24,
        10000,
        // For Port 2.5 as it is TA_0.2
        TIMER_A_CAPTURECOMPARE_REGISTER_2,
        TIMER_A_OUTPUTMODE_RESET_SET,
        1000
};

int main(void)
{
    /* Halting the watchdog */
    MAP_WDT_A_holdTimer();

    /* Configuring P4.4 and P4.5 as Output. P2.4 as peripheral output for PWM and P1.1 for button interrupt */

    // This output allow motor to turn (clockwise direction in1->4.5 and in2->P4.4)
    // Set the P4.4 and 4.5 as out for the left wheel
    GPIO_setAsOutputPin(GPIO_PORT_P4, GPIO_PIN4);
    GPIO_setAsOutputPin(GPIO_PORT_P4, GPIO_PIN5);

    // Set P4.4 as low and 4.5 as high for the left wheel to turn clockwise. High on In1 and Low on In2
    // To change the direction just put Low on In1 and High on In2 (Anticlockwise)
    GPIO_setOutputLowOnPin(GPIO_PORT_P4, GPIO_PIN4);
    GPIO_setOutputHighOnPin(GPIO_PORT_P4, GPIO_PIN5);



    //Set P4.0 and 4.2 as out for right wheel
    GPIO_setAsOutputPin(GPIO_PORT_P4, GPIO_PIN0);
    GPIO_setAsOutputPin(GPIO_PORT_P4, GPIO_PIN2);

    //Set P4.0 and 4.2 as out for right wheel to move it clockwise High on In3 and Low on In4
    // (clockwise direction in3->4.2 and in4->P4.0)
    GPIO_setOutputHighOnPin(GPIO_PORT_P4, GPIO_PIN2);
    GPIO_setOutputLowOnPin(GPIO_PORT_P4, GPIO_PIN0);



    // Set the PSEL0 & PSEL1 multiplex and alternative pin function as timer function
    // Set peripheral module function in the output direction for PWM P2.4 for left wheel & 2.5 for right wheel as primary module function modes.
    GPIO_setAsPeripheralModuleFunctionOutputPin(GPIO_PORT_P2, GPIO_PIN4, GPIO_PRIMARY_MODULE_FUNCTION);
    GPIO_setAsPeripheralModuleFunctionOutputPin(GPIO_PORT_P2, GPIO_PIN5, GPIO_PRIMARY_MODULE_FUNCTION);

    // Set the P1.1 & 1.4 as pull up resistor for button interrupt
    // P1.1 control PWM for left motor
    // P1.4 control PWM for right motor
    GPIO_setAsInputPinWithPullUpResistor(GPIO_PORT_P1, GPIO_PIN1);
    GPIO_setAsInputPinWithPullUpResistor(GPIO_PORT_P1, GPIO_PIN4);

    // Clear the interrupt flag and enable interrupt for P1.1
    GPIO_clearInterruptFlag(GPIO_PORT_P1, GPIO_PIN1);
    GPIO_enableInterrupt(GPIO_PORT_P1, GPIO_PIN1);

    // Clear the interrupt flag and enable interrupt for P1.4
    GPIO_clearInterruptFlag(GPIO_PORT_P1, GPIO_PIN4);
    GPIO_enableInterrupt(GPIO_PORT_P1, GPIO_PIN4);

    /* Configuring Timer_A to have a period of approximately 80ms and an initial duty cycle of 10% of that (1000 ticks)  */
    // For left motor
    Timer_A_generatePWM(TIMER_A0_BASE, &pwmConfig);
    // For right motor
    Timer_A_generatePWM(TIMER_A0_BASE, &pwmConfig2);

    /* Enabling global interrupts and starting the watchdog timer */
    Interrupt_enableInterrupt(INT_PORT1);
    Interrupt_enableSleepOnIsrExit();
    Interrupt_enableMaster();

    /* Sleeping when not in use */
    while (1)
    {
        PCM_gotoLPM0();
    }
}

/* Port1 ISR - This ISR will progressively step up the duty cycle of the PWM on a button press */
void PORT1_IRQHandler(void)
{
    uint32_t status = MAP_GPIO_getEnabledInterruptStatus(GPIO_PORT_P1);
    GPIO_clearInterruptFlag(GPIO_PORT_P1, status);

    if (status & GPIO_PIN1)
    {
        //Left Motor
        if(pwmConfig.dutyCycle == 9000)
            pwmConfig.dutyCycle = 1000;

        else
            pwmConfig2.dutyCycle += 1000;
        Timer_A_generatePWM(TIMER_A0_BASE, &pwmConfig2);
    }

    if (status & GPIO_PIN4) {
        // Right Motor
        if(pwmConfig.dutyCycle == 9000)
            pwmConfig.dutyCycle = 1000;

        else
            pwmConfig.dutyCycle += 1000;

        Timer_A_generatePWM(TIMER_A0_BASE, &pwmConfig);
    }
}

