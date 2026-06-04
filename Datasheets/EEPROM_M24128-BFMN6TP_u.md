<!-- image -->

<!-- image -->

TSSOP8 (169 mil width)

<!-- image -->

<!-- image -->

SO8N

(150 mil width)

UFDFPN5 - DFN5 (1.7x1.4 mm)

<!-- image -->

UFDFPN8 - DFN8 (2 x 3 mm)

<!-- image -->

WLSCP8 (1.289 x 1.099 mm)

<!-- image -->

Unsawn wafer

| ## Product status  M24128-DF  M24128-BF  M24128-BR  M24128-BW   |
|-----------------------------------------------------------------|

## Product label

<!-- image -->

## Features

## I²C interface

- Compatible with the following I²C bus modes:
- -1 MHz (Fast-mode Plus)
- -400 kHz (Fast-mode)
- -100 kHz (Standard-mode)

## Memory

- 128-Kbit (16-Kbyte) of EEPROM
- Page size: 64-byte
- Additional 64-byte identification page (for M24128-D)

## Supply voltage

- Wide voltage range:
- -1.7 V to 5.5 V from -40 °C to + 85 °C
- -1.6 V to 5.5 V from 0 ° C to + 85 °C

## Temperature

- Operating temperature range: -40 °C to +85 °C

## Fast write cycle time

- Byte and page write within 5 ms

## Performance

- Enhanced ESD/latch-up protection
- More than 4 million write cycles
- More than 200-year data retention

## Advanced features

- Hardware write protection of the whole memory array
- Random and sequential read modes

## Packages

- SO8N, TSSOP8, UFDFPN8, WLCSP8, and UFDFPN5 (ECOPACK2)
- Unsawn wafer (each die is tested)

## M24128-BW M24128-BR M24128-BF M24128-DF

Datasheet

## 128-Kbit serial I²C bus EEPROM

<!-- image -->

## 1 Description

The M24128 is a 128-Kbit I 2 C-compatible EEPROM (electrically erasable programmable memory) organized as 16 K × 8 bits.

The M24128-BW can operate with a supply voltage from 2.5 V to 5.5 V, the M24128-BR with a supply voltage from 1.8 V to 5.5 V, and M24128-BF and M24128-DF with a supply voltage from 1.7 V to 5.5 V. M24128-BF and M24128-DF can also operate down to 1.6 V, under some restricting conditions. All devices operate with a clock frequency of 1 MHz (or less), over an ambient temperature range of -40 °C to +85 °C.

The M24128-D offers an additional page, named the identification page (64 bytes). It can be used to store sensitive application parameters, which can later be permanently locked in read-only mode.

Figure 1. Logic diagram

<!-- image -->

Table 1. Signal names

| Signal name  Function  Direction  E2, E1, E0  Chip enable  Input  SDA  Serial data  I/O  SCL  Serial clock  Input  WC  Write control  Input  VCC  Supply voltage  -  VSS  Ground  -   |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

Figure 2. 8-pin package connections, top view

<!-- image -->

1. See Package information for package dimensions, and how to identify pin 1

DT01845fV1

<!-- image -->

Figure 3. UFDFPN5 (DFN5) package connections

<!-- image -->

<!-- image -->

Bottom view (pads side)

1. Inputs E2, E1, E0 are not connected, therefore read as (000). Refer to Section 2.3: Chip enable (E2, E1, E0) for further explanations.

Figure 4. WLCSP connections for the M24128-DFCS6TP/K

<!-- image -->

Marking side (top view)

<!-- image -->

Bump side (bottom view)

<!-- image -->

## 2 Signal description

## 2.1 Serial clock (SCL)

SCL is an input. The signal applied on it is used to strobe the data available on SDA(in) and to output the data on SDA(out).

## 2.2 Serial data (SDA)

SDA is an input/output used to transfer data in or out of the device. SDA(out) is an open-drain output that can be wired -AND with other open-drain or open-collector signals on the bus. A pull -up resistor must be connected from serial data (SDA) to V CC  (Figure 13 and Figure 14 indicate how to calculate the value of the pull -up resistor).

## 2.3 Chip enable (E2, E1, E0)

Chip enable is an input. The signals applied to it are used to set the value that is to be looked for on the three least significant bits (b3, b2, b1) of the 7-bit device select code (see Table 2). These inputs must be connected to VCC or VSS, as shown in Figure 5. When not connected (left floating), these inputs are read as low (0).

Figure 5. Chip enable inputs connection

<!-- image -->

## 2.4 Write control (WC)

WC is an input signal useful for protecting the contents of the memory from inadvertent write operations. All write operations are disabled when WC is driven high. They are enabled when it is either driven low or left floating.

When WC is driven high, device select and address bytes are acknowledged, but the data bytes are not acknowledged.

## 2.5 VSS (ground)

VSS is the reference for the V CC  supply voltage.

<!-- image -->

## 2.6 Supply voltage (VCC)

## 2.6.1 Operating supply voltage (VCC)

Before selecting the memory and issuing instructions to it, a valid and stable V CC  voltage within the specified [V CC (min), V CC (max)] range must be applied (see operating conditions in Section 8: DC and AC parameters).

To secure a stable DC supply voltage, it is recommended to decouple the V CC  line with a suitable capacitor (usually from 10 nF to 100 nF) close to the VCC/VSS package pins.

This voltage must remain stable and valid until the end of the transmission of the instruction and, for a write instruction, until the completion of the internal write cycle (t W ).

## 2.6.2 Power-up conditions

The VCC voltage increases from 0 V up to the minimum V CC  operating voltage (see operating conditions in Section 8: DC and AC parameters).

## 2.6.3 Device reset

To prevent inadvertent write operations during power-up, a power-on reset (POR) circuit is included.

At power-up, the device does not respond to any instruction until V CC  has reached the internal reset threshold voltage. This threshold is lower than the minimum V CC  operating voltage (see operating conditions in Section 8: DC and AC parameters). When VCC passes over the POR threshold, the device is reset and enters the standby power mode. The device must not be accessed until V CC  reaches a valid and stable DC voltage within the specified [V CC (min), V CC (max)] range (see operating conditions in Section 8: DC and AC parameters).

Similarly, during power-down, when the V CC  decreases, the device must not be accessed once V CC  drops below VCC(min). When VCC drops below the power-on-reset threshold voltage, the device stops responding to any instruction sent to it.

## 2.6.4 Power-down conditions

During power-down, when the VCC decreases, the device must be in the standby power mode (the mode is reached after decoding a stop condition, with no internal write cycle in progress).

<!-- image -->

## 3 Memory organization

The memory is organized as shown in the following figure.

Figure 6. Block diagram

<!-- image -->

<!-- image -->

## 4 Device operation

The device supports the I²C protocol summarized in Figure 7. Any device that sends data onto the bus is defined as a transmitter, and any device that reads the data is defined as a receiver. The device that controls the data transfer is known as the bus controller, and the other as the target. A data transfer can only be initiated by the bus controller, which also provides the serial clock for synchronization. The device is always a target in all communications.

Figure 7. I²C bus protocol

<!-- image -->

<!-- image -->

## 4.1 Start condition

The start condition is identified by a falling edge of serial data (SDA) while the serial clock (SCL) is stable in the high state. This condition must precede any data transfer instruction. The device continuously monitors the SDA and SCL for a start signal, except during a write cycle.

## 4.2 Stop condition

The stop condition is identified by a rising edge of serial data (SDA) while the serial clock (SCL) is stable in the high state. This condition terminates the communication between the device and the bus controller. A read instruction followed by NO ACK can be followed by a stop condition to force the device into the standby mode. A stop condition at the end of a write instruction triggers the internal write cycle.

## 4.3 Data input

During data input, the device samples the serial data (SDA) on the rising edge of the serial clock (SCL). For proper device operation, the SDA must be stable during the rising edge of the SCL, and the SDA signal must change only when the SCL is driven low.

## 4.4 Acknowledge bit (ACK)

The acknowledge bit is used to indicate a successful byte transfer. The bus transmitter, whether a bus controller or target device, releases serial data (SDA) after sending eight bits of data. During the ninth clock pulse period, the receiver pulls SDA low to acknowledge the receipt of the eight data bits.

Device operation

<!-- image -->

## 4.5 Device addressing

To start communication between the bus controller and the target device, the bus controller must initiate a start condition. It then sends the device select code, shown in Table 2 (the most significant bit first).

When using the DFN5 package, the Ei pins are not accessible and are read as low (0). In this case, to properly communicate with the device, the E0, E1, and E2 bits must always be set to 0 for any operation. See Table 2.

When the device select code is received, the device responds only if the chip enable address matches the value on the chip enable (E2, E1, E0) inputs.

The eighth bit is the read/write bit (RW). This bit is set to 1 for read and 0 for write operations.

If a match occurs, the corresponding device gives an acknowledgement on serial data (SDA) during the ninth bit time. If the device does not match the device select code, it deselects itself from the bus and goes into standby mode.

Table 2. Device select code

| Features  Device type identifier (1)  Chip Enable address (2)  RW  b7  b6  b5  b4  b3  b2  b1  b0  Device select code when addressing the memory array  1  0  1  0  E2  E1  E0  RW  Device select code when addressing the memory array with the  DFN5 package  1  0  1  0  0  0  0  RW  Device select code when accessing the identification page  1  0  1  1  E2  E1  E0  RW  Device select code when accessing the identification page with the  DFN5 package  1  0  1  1  0  0  0  RW   |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

<!-- image -->

## 5 Instructions

## 5.1 Write operations

Following a start condition the bus controller sends a device select code with the RW bit (RW) reset to 0. The device acknowledges this, as shown in Figure 8. Write mode sequences with WC = 0 (data write enabled), and waits for two address bytes. The device responds to each address byte with an acknowledge bit, and then waits for the data byte.

Table 3. Most significant address byte

<!-- image -->

| A7  A6  A5  A4  A3  A2  A1  A0   |
|----------------------------------|

When the bus controller generates a stop condition immediately after a data byte ACK bit (in the tenth bit time slot), either at the end of a byte write or a page write, the internal write cycle t W  is triggered. A stop condition at any other time slot does not trigger the internal write cycle.

After the stop condition and the successful completion of an internal write cycle (t W ), the device internal address counter is automatically incremented to point to the next byte after the last modified byte.

During the internal write cycle, serial data (SDA) is disabled internally, and the device does not respond to any requests.

If the write control input (WC) is driven high, the write instruction is not executed and the accompanying data bytes are not acknowledged, as shown in Figure 9. Write mode sequences with WC = 1 (data write inhibited).

<!-- image -->

## 5.1.1 Byte write

After the device select code and the address bytes, the bus controller sends one data byte. If the addressed location is write-protected through the WC pin being driven high, the device replies with NO ACK, and the location is not modified, as shown in Figure 9. If the addressed location is not write-protected, the device replies with an ACK. The bus controller terminates the transfer by generating a stop condition, as shown in the following figure.

Figure 8. Write mode sequences with WC = 0 (data write enabled)

<!-- image -->

Instructions

<!-- image -->

## 5.1.2 Page write

Using this mode it is possible to write up to 64 bytes in a single write cycle, provided they are all located on the same page. This means that the most significant memory address bits, from A15 to A6, are the same. If more bytes are sent than fit up to the end of the page, a roll-over occurs: the bytes exceeding the page end are written on the same page, from location 0.

The bus controller sends from 1 to 64 bytes of data, each is acknowledged by the device if the addressed bytes are not write-protected through the WC pin (driven low). In the opposite case, when the addressed bytes are write-protected by the WC pin (driven high), the contents of the addressed memory location are not modified, and each data byte is followed by a NO ACK, as shown in Figure 9. After each transferred byte, the internal page address counter is incremented.

The transfer is terminated when the bus controller generates a stop condition.

Figure 9. Write mode sequences with WC = 1 (data write inhibited)

<!-- image -->

## M24128-BW M24128-BR M24128-BF M24128-DF

Instructions

<!-- image -->

## 5.1.3 Write identification page (M24128-D only)

The identification page (64-byte) is an additional page which can be written and (later) permanently locked in read-only mode. It is written by issuing the write identification page instruction. This instruction uses the same protocol and format as page write (into memory array), except for the following differences:

- Device type identifier = 1011
- MSB address bits from A15 to A6 are don't care except for address bit A10 which must be 0. LSB address bits from A5 to A0 define the byte address inside the identification page.

If the identification page is locked, the data bytes transferred during the write identification page instruction are not acknowledged (NO ACK).

## 5.1.4 Lock identification page (M24128-D only)

The lock identification page instruction (lock ID) permanently locks the identification page in read-only mode. This instruction is similar to byte write (into a memory array) with the following specific conditions:

- Device type identifier = 1011
- Address bit A10 must be 1; all other address bits are don't care
- The data byte must be equal to the binary value xxxx xx1x, where x is don't care

## 5.1.5 ECC (error correction code) and write cycling

The ECC is offered in devices identified with process letter A or K, all other devices (identified with a different process letter) do not embed the ECC logic.

The error correction code (ECC) is an internal logic function which is transparent for the I 2 C communication protocol.

The ECC logic is implemented on each group of four EEPROM bytes(a group of four bytes is located at addresses [4*N, 4*N+1, 4*N+2, 4*N+3], where N is an integer). Inside a group, if a single bit out of the four bytes happens to be erroneous during a read operation, the ECC detects this bit and replaces it with the correct value. The read reliability is therefore much improved.

Even if the ECC function is performed on groups of four bytes, a single byte can be written/cycled independently. In this case, the ECC function also writes/cycles the three other bytes located in the same group (a group of four bytes is located at addresses [4*N, 4*N+1, 4*N+2, 4*N+3], where N is an integer).

As a consequence, the maximum cycling budget is defined at group level and the cycling can be distributed over the four bytes of the group: the sum of the cycles seen by byte0, byte1, byte2 and byte3 of the same group must remain below the maximum value defined in Table 11. Cycling performance.

Instructions

<!-- image -->

## 5.1.6 Minimizing write delays by polling on ACK

During the internal write cycle, the device disconnects itself from the bus, and writes a copy of the data from its internal latches to the memory cells. The maximum write time (t w ) is shown in Table 16. AC characteristics in Fast-mode  and Table 17. AC characteristics in Fast-mode Plus. The bus controller can implement a polling sequence to utilize this feature.

The sequence, as shown in Figure 10, is:

- Initial condition: A write cycle is in progress.
- Step 1: The bus controller issues a Start condition followed by a device select code (the first byte of the new instruction).
- Step 2: If the device is busy with the internal write cycle, NO ACK is returned and the bus controller goes back to step 1. If the device has terminated the internal write cycle, it responds with an ACK, indicating that it is ready to receive the second part of the instruction (the first byte of this instruction has been sent during step 1).
1. The seven most significant bits of the first device select code in a random read (bottom right box in the figure) must match those of the device select code in the write operation (polling instruction in the figure).

Figure 10. Write cycle polling flowchart using ACK

<!-- image -->

<!-- image -->

## 5.2 Read operations

Read operations are performed independently of the state of the write control (WC) signal.

After the successful completion of a read operation, the device internal address counter is incremented by one, to point to the next byte address.

For the read instructions, after each byte read (data out), the device waits for an acknowledgment (data in) during the ninth bit time. If the bus controller does not acknowledge during this ninth time, the device terminates the data transfer and switches to its standby mode.

Figure 11. Read mode sequences

<!-- image -->

DT01105dV1

<!-- image -->

## 5.2.1 Random address read

A dummy write is first performed to load the address into this address counter (as shown in Figure 11) but without sending a stop condition. Then, the bus controller sends another start condition, and repeats the device select code, with the RW bit set to 1. The device acknowledges this, and outputs the contents of the addressed byte. The bus controller must not acknowledge the byte, and terminates the transfer with a stop condition.

## 5.2.2 Current address read

For the current address read operation, following a start condition, the bus controller only sends a device select code with the RW bit set to 1. The device acknowledges this, and outputs the byte addressed by the internal address counter. The counter is then incremented. The bus controller terminates the transfer with a stop condition, as shown in Figure 11, without acknowledging the byte.

Note that the address counter value is defined by instructions accessing either the memory or the identification page. When accessing the identification page, the address counter value is loaded with the byte location in the identification page, therefore the next current address read in the memory uses this new address counter value. When accessing the memory, it is safer to always use the random address read instruction (this instruction loads the address counter with the byte location to read in the memory, see Section 5.2.1: Random address read) instead of the current address read instruction.

## 5.2.3 Sequential read

This operation can be used after a current address read or a random address read. The bus controller does acknowledge the data byte output and sends additional clock pulses so that the device continues to output the next byte in sequence. To terminate the stream of bytes, the bus controller must not acknowledge the last byte, and must generate a stop condition, as shown in Figure 11.

The output data comes from consecutive addresses, with the internal address counter automatically incremented after each byte is output. After reaching the last memory address, the address counter rolls over, and the device continues to output data from the memory address 00h.

## 5.3 Read identification page (M24128-D only)

The identification page (64 bytes) is an additional page that can be written and later permanently locked in read -only mode.

The identification page can be read by issuing a read identification page instruction. This instruction uses the same protocol and format as the random address read (from a memory array) with device type identifier defined as 1011. The MSB address bits from A15 to A6 are don't care. The LSB address bits from A5 to A0 define the byte address inside the identification page. The number of bytes to read in the ID page must not exceed the page boundary (for example: when reading the identification page from location 10d, the number of bytes should be less than or equal to 54, as the ID page boundary is 64 bytes).

## 5.4 Read the lock status (M24128-D only)

The locked/unlocked status of the identification page can be checked by transmitting a specific truncated command [identification page write instruction + one data byte] to the device. The device returns an acknowledge bit if the identification page is unlocked, otherwise a NO ACK bit if the identification page is locked.

Afterwards, it is recommended to transmit to the device a start condition followed by a stop condition, ensuring that:

- Start: the truncated command is not executed because the start condition resets the device internal logic
- Stop: the device is then set back into standby mode by the stop condition

## M24128-BW M24128-BR M24128-BF M24128-DF

Instructions

<!-- image -->

## 6 Initial delivery state

The device is delivered with all the memory array bits and Identification page bits set to 1 (each byte contains FFh).

When delivered in unsawn wafer, all memory bits are set to 1 (each memory byte contains FFh) except the last byte located at address 3FFFh which is written with the value 22h.

<!-- image -->

## 7 Maximum ratings

Stressing the device outside the ratings listed in Table 5 may permanently damage it. These are stress ratings only, and operation of the device at these, or any other conditions outside those indicated in the operating sections of this specification, is not implied. Exposure to absolute maximum rating conditions for extended periods may affect device reliability.

Table 5. Absolute maximum ratings

| Symbol  Parameter  Min.  Max.  Unit  -  Ambient operating temperature  -40  130  °C  TSTG  Storage temperature  -65  150  °C  TLEAD  Lead temperature during soldering  See note  (1)  °C  IOL  DC output current (SDA = 0)  -  5  mA  VIO  Input or output range  -0.50  6.5  V  VCC  Supply voltage  -0.50  6.5  V  VESD  Electrostatic pulse (human body model) (2)  -  4000 (3)  V   |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

<!-- image -->

## 8 DC and AC parameters

This section summarizes the operating and measurement conditions, and the DC and AC characteristics of the device.

Table 6. Operating conditions (voltage range W)

| Symbol  Parameter  Min.  Max.  Unit  VCC  Supply voltage  2.5  5.5  V  TA  Ambient operating temperature  -40  85  °C  fC  Operating clock frequency  -  1  MHz   |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|

Table 7. Operating conditions (voltage range R)

| Symbol  Parameter  Min.  Max.  Unit  VCC  Supply voltage  1.8  5.5  V  TA  Ambient operating temperature  -40  85  °C  fC  Operating clock frequency  -  1  MHz   |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|

Table 8. Operating conditions (voltage range F)

| Symbol  Parameter  Min.  Max.  Unit  VCC  Supply voltage  1.6 (1)  1.7  5.5  V  TA  Ambient operating temperature: READ  -40  -40  85  °C  Ambient operating temperature: WRITE  0  -40  85  fC  Operating clock frequency, V CC  ≥ 1.6 V (1)  -  400  kHz  Operating clock frequency, V CC  ≥ 1.7 V  -  1000   |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

Table 9. AC measurement conditions

| Symbol  Parameter  Min.  Max.  Unit  Cbus  Load capacitance  -  100  pF  -  SCL input rise/fall time, SDA input fall time  -  50  ns  -  Input levels  0.2 V CC  to 0.8 V CC  V  -  Input and output timing reference levels  0.3 V CC  to 0.7 V CC  V   |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

Figure 12. AC measurement I/O waveform

<!-- image -->

DT19774V1

<!-- image -->

Table 10. Input parameters

| Symbol  Parameter (1)  Test condition  Min.  Max.  Unit  CIN  Input capacitance (SDA)  -  -  8  pF  CIN  Input capacitance (other pins)  -  -  6  pF  ZL  Input impedance (E2, E1, E0, WC) (2)  VIN &lt; 0.3 V CC  50  -  kΩ  ZH  VIN &gt; 0.7 V CC  500  -  kΩ   |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

1. Evaluated by characterization - Not tested in production.
2. E2, E1, E0 input impedance when the memory is selected (after a Start condition).
1. The Write cycle endurance is defined by characterization and qualification. For devices embedding the ECC functionality (see Section 5.1.5), the write cycle endurance is defined for group of four bytes located at addresses [4*N, 4*N+1, 4*N+2, 4*N+3] where N is an integer.
2. A Write cycle is executed when either a Page Write, a Byte write, a Write Identification Page or a Lock Identification Page instruction is decoded. When using the Byte Write, the Page Write or the Write Identification Page, refer also to Section 5.1.5
1. The data retention behaviour is checked in production, while the data retention limit defined in this table is extracted from characterization and qualification results.

Table 11. Cycling performance

| Symbol  Parameter  Test condition  Max.  Unit  Ncycle  Write cycle endurance (1)  TA ≤  25 °C, V CC (min) &lt; V CC  &lt; V CC (max)  4,000,000  Write cycle (2)  TA = 85 °C, V CC (min) &lt; V CC  &lt; V CC (max)  1,200,000   |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

Table 12. Memory cell data retention

| Parameter  Test condition  Min.  Unit  Data retention (1)  TA = 55 °C  200  Year   |
|------------------------------------------------------------------------------------|

<!-- image -->

## M24128-BW M24128-BR M24128-BF M24128-DF

Table 13. DC characteristics (M24128-BW)

| Symbol  Parameter  Test conditions (in addition to those in Table 6)  Min.  Max.  Unit  I  LI  Input leakage current  (SCL, SDA, E2, E1, E0)  VIN  = V SS  or V CC, device in Standby mode  -  ± 2  µA  ILO  Output leakage current  SDA in Hi-Z, external voltage applied on SDA: V SS  or V CC  -  ± 2  µA  ICC  Supply current (Read)  VCC = 2.5 V, f C  = 400 kHz  -  1  mA  VCC = 5.5 V, f C  = 400 kHz  -  2  2.5 V ≤VCC ≤ 5.5 V, f C  = 1 MHz  -  2.5  ICC0  Supply current (Write)  During t W ,  2.5 V ≤ V CC  ≤ 5.5 V  -  2.5 (1)  mA  ICC1  Standby supply current  Device not selected (2) ,  VIN = V SS  or V CC , V CC  = 2.5 V  -  2  μA  Device not selected,  VIN = V SS  or V CC , V CC  = 5.5 V  -  3  μA  VIL  Input low voltage (3)  (SCL, SDA, WC, E2, E1, E0)  -  -0.45  0.3 V CC  V  VIH  Input high voltage  (SCL, SDA)  -  0.7 V CC  6.5  V  Input high voltage  (WC, E2, E1, E0) (4)  -  0.7 V CC  VCC+0.6  V  VOL  Output low voltage  I OL = 2.1 mA, V CC  = 2.5 V or  I OL = 3 mA, VCC = 5.5 V  -  0.4  V   |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

1. Evaluated by characterization - Not tested in production.
2. The device is not selected after power-up, after a read instruction (after the stop condition), or after the completion of the internal write cycle t W  (t W is triggered by the correct decoding of a write instruction).
3. Ei  inputs should be tied to V ss  (see Section 2.3).
4. Ei inputs should be tied to Vcc (see Section 2.3).

<!-- image -->

## M24128-BW M24128-BR M24128-BF M24128-DF

Table 14. DC characteristics (M24128-BR)

| Symbol  Parameter  Test conditions  (1) (in addition to those in Table 7)  Min.  Max.  Unit  I  LI  Input leakage current  ( E0, E1, E2, SCL, SDA)  VIN  = V SS  or V CC, device in Standby mode  -  ± 2  µA  ILO  Output leakage current  SDA in Hi-Z, external voltage applied on SDA: V SS  or  VCC  -  ± 2  µA  ICC  Supply current (Read)  VCC = 1.8 V, f c = 400 kHz  -  0.8  mA  f c = 1 MHz  -  2.5  mA  ICC0  Supply current (Write)  Value averaged on t W ,  1.8 V ≤ V CC  &lt; 2.5 V  -  2 (2)  mA  ICC1  Standby supply current  Device not selected, (3)  VIN  = V SS  or V CC, V CC  = 1.8 V  -  1  µA  VIL  Input low voltage (SCL, SDA,  WC,E2, E1, E0) (4)  1.8 V ≤ V CC  &lt; 2.5 V  -0.45  0.25 VCC  V  VIH  Input high voltage  (SCL, SDA)  1.8 V ≤ V CC  &lt; 2.5 V  0.75 VCC  6.5  V  Input high voltage  (WC, E2, E1, E0 (5) )  1.8 V ≤ V CC  &lt; 2.5 V  0.75 VCC  VCC+0.6  V  VOL  Output low voltage  I OL = 1 mA, VCC = 1.8 V  -  0.2  V   |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

1. If the application uses the voltage range R device with 2.5 V &lt; V cc  &lt; 5.5 V and -40 °C &lt; T A  &lt; +85 °C, refer to Table 13.

2. Evaluated by characterization - Not tested in production.

3. The device is not selected after power-up, after a read instruction (after the stop condition), or after the completion of the internal write cycle t W  (t W is triggered by the correct decoding of a write instruction).
4. Ei inputs should be tied to V SS  (see Section 2.3).
5. Ei inputs should be tied to V CC  (see Section 2.3).

<!-- image -->

## M24128-BW M24128-BR M24128-BF M24128-DF

Table 15. DC characteristics (M24128-BF, M24128-DF)

| Symbol  Parameter  Test conditions (1)  (in addition to those in Table 8)  Min.  Max.  Unit  I  LI  Input leakage current  (E0, E1, E2, SCL, SDA)  VIN  = V SS  or VCC  device in Standby mode  -  ± 2  µA  ILO  Output leakage current  SDA in Hi-Z, external voltage applied on SDA: V SS  or  VCC  -  ± 2  µA  ICC  Supply current (Read)  VCC = 1.6 V or 1.7 V, f c = 400 kHz  -  0.8  mA  f c = 1 MHz  -  2.5  ICC0  Supply current (Write)  Value averaged on t W ,  VCC &lt; 2.5 V  -  2 (2)  mA  ICC1  Standby supply current  Device not selected, (3)  VIN  = V SS  or V CC, V CC  = 1.6 V or 1.7 V  -  1  µA  VIL  Input low voltage (SCL, SDA,  WC,E2, E1, E0) (4)  VCC &lt; 2.5 V  -0.45  0.25 VCC  V  VIH  Input high voltage  (SCL, SDA)  VCC &lt; 2.5 V  0.75 VCC  6.5  V  Input high voltage  (WC, E2, E1, E0) (5)  VCC &lt; 2.5 V  0.75 VCC  VCC+0.6  V  VOL  Output low voltage  I OL = 1 mA, VCC = 1.6 V or 1.7 V  -  0.2  V   |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

2. Evaluated by characterization - Not tested in production.
3. The device is not selected after power-up, after a read instruction (after the stop condition), or after the completion of the internal write cycle t W  (t W is triggered by the correct decoding of a write instruction).
4. Ei inputs should be tied to V SS  (see Section 2.3).
5. Ei inputs should be tied to V CC  (see Section 2.3).

<!-- image -->

## M24128-BW M24128-BR M24128-BF M24128-DF

Table 16. AC characteristics in Fast-mode

| Symbol  Alt.  Parameter  Min.  Max.  Unit  fC  fSCL  Clock frequency  -  400  kHz  tCHCL  tHIGH  Clock pulse width high  600  -  ns  tCLCH  tLOW  Clock pulse width low  1300  -  ns  tQL1QL2  (1)  tF  SDA (out) fall time  20 (2)  300  ns  tXH1XH2  tR  Input signal rise time  (3)  (3)  ns  t XL1XL2  tF  Input signal fall time  (3)  (3)  ns  tDXCH  tSU:DAT  Data in set up time  100  -  ns  tCLDX  tHD:DAT  Data in hold time  0  -  ns  tCLQX  (4)  tDH  Data out hold time  50  -  ns  tCLQV  (5)  tAA  Clock low to next data valid (access time)  -  900  ns  tCHDL  t SU:STA  Start condition setup time  600  -  ns  tDLCL  tHD:STA  Start condition hold time  600  -  ns  tCHDH  tSU:STO  Stop condition set up time  600  -  ns  tDHDL  tBUF  Time between Stop condition and next Start condition  1300  -  ns  t  WLDL (1)(6)  tSU:WC  WC set up time (before the Start condition)  0  -  µs  t DHWH (1)(7)  tHD:WC  WC hold time (after the Stop condition)  1  -  µs  tW  tWR  Internal Write cycle duration  -  5  ms  t  NS (1)  -  Pulse width ignored (input filter on SCL and SDA) - single glitch  -  50  ns   |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

3. There is no min. or max. values for the input signal rise and fall times. It is however recommended by the I²C specification that the input signal rise and fall times be more than 20 ns and less than 300 ns when f C  &lt; 400 kHz.
4. To avoid spurious Start and Stop conditions, a minimum delay is placed between SCL=1 and the falling or rising edge of SDA.
5. t CLQV is the time (from the falling edge of SCL) required by the SDA bus line to reach either 0.3V CC  or 0.7V CC , assuming that R bus  × C bus  time constant is within the values specified in Figure 13.
6. WC=0 set up time condition to enable the execution of a WRITE command.
7. WC=0 hold time condition to enable the execution of a WRITE command.

<!-- image -->

## M24128-BW M24128-BR M24128-BF M24128-DF

Table 17. AC characteristics in Fast-mode Plus

| Symbol  Alt.  Parameter  Min.  Max.  Unit  fC  fSCL  Clock frequency  -  1  MHz  tCHCL  tHIGH  Clock pulse width high  260  -  ns  tCLCH  tLOW  Clock pulse width low  500  -  ns  tXH1XH2  tR  Input signal rise time  (1)  (1)  ns  t XL1XL2  tF  Input signal fall time  (1)  (1)  ns  tQL1QL2  (2)  tF  SDA (out) fall time  20 (3)  120  ns  tDXCH  tSU:DAT  Data in setup time  50  -  ns  tCLDX  tHD:DAT  Data in hold time  0  -  ns  tCLQX  (4)  tDH  Data out hold time  50  -  ns  tCLQV  (5)  tAA  Clock low to next data valid (access time)  -  450  ns  tCHDL  t SU:STA  Start condition setup time  250  -  ns  t DLCL  tHD:STA  Start condition hold time  250  -  ns  tCHDH  tSU:STO  Stop condition setup time  250  -  ns  tDHDL  tBUF  Time between Stop condition and next Start condition  500  -  ns  t  WLDL (2)(6)  tSU:WC  WC set up time (before the Start condition)  0  -  µs  t DHWH (2)(7)  tHD:WC  WC hold time (after the Stop condition)  1  -  µs  tW  tWR  Write time  -  5  ms  t  NS (2)  -  Pulse width ignored (input filter on SCL and SDA)  -  50  ns   |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

1. There is no min. or max. values for the input signal rise and fall times. It is however recommended by the I²C specification that the input signal rise and fall times be less than 120 ns when f C  &lt; 1 MHz.
2. Evaluated by characterization - Not tested in production.
3. With CL = 10 pF.
4. To avoid spurious Start and Stop conditions, a minimum delay is placed between SCL=1 and the falling or rising edge of SDA.
5. t CLQV is the time (from the falling edge of SCL) required by the SDA bus line to reach either 0.3 V CC  or 0.7 V CC , assuming that the Rbus × Cbus time constant is within the values specified in Figure 14.
6. WC=0 set up time condition to enable the execution of a WRITE command.
7. WC=0 hold time condition to enable the execution of a WRITE command.

<!-- image -->

## M24128-BW M24128-BR M24128-BF M24128-DF

Figure 13. R bus  value versus bus parasitic capacitance (C bus ) for an I 2 C bus  (f C  = 400 kHz)

<!-- image -->

DT37916V5

Figure 14. R bus  value versus bus parasitic capacitance (C bus ) for an I 2 C bus (f C  = 1 MHz)

<!-- image -->

<!-- image -->

Figure 15. AC waveforms

<!-- image -->

<!-- image -->

## 9 Package information

To meet environmental requirements, ST offers these devices in different grades of ECOPACK packages, depending on their level of environmental compliance. ECOPACK specifications, grade definitions, and product status are available at: www.st.com. ECOPACK is an ST trademark.

For die information concerning the M24128-BF delivered in unsawn wafer, contact your nearest ST sales office.

## 9.1 UFDFPN5 (DFN5) package information

UFDFPN5 is a 5-lead, 1.7 × 1.4 mm, 0.55 mm thickness, ultrathin fine-pitch dual flat package.

Figure 16. UFDFPN5 - Outline

<!-- image -->

1. The maximum package warpage is 0.05 mm.
2. Exposed copper is not systematic and can appear partially or totally according to the cross section.
3. Drawing is not to scale.
4. On the bottom side, pin 1 is identified by the specific pad shape and, on the top side, pin 1 is defined from the orientation of the marking. When reading the marking, pin 1 is below the upper left package corner.

<!-- image -->

Table 18. UFDFPN5 - Mechanical data

| Symbol  millimeters  inches  Min  Typ  Max  Min  Typ  Max  A  0.500  0.550  0.600  0.0197  0.0217  0.0236  A1  0.000  -  0.050  0.0000  -  0.0020  b (1)  0.175  0.200  0.225  0.0069  0.0079  0.0089  D  1.600  1.700  1.800  0.0630  0.0669  0.0709  D1  1.400  1.500  1.600  0.0551  0.0591  0.0630  E  1.300  1.400  1.500  0.0512  0.0551  0.0591  E1  0.175  0.200  0.225  0.0069  0.0079  0.0089  X  -  0.200  -  -  0.0079  -  Y  -  0.200  -  -  0.0079  -  e  -  0.400  -  -  0.0157  -  L  0.500  0.550  0.600  0.0197  0.0217  0.0236  L1  -  0.100  -  -  0.0039  -  k  -  0.400  -  -  0.0157  -   |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

1. Dimension b applies to the plated terminal and is measured between 0.15 and 0.30 mm from the terminal tip.
1. Dimensions are expressed in millimeters.

Figure 17. UFDFPN5 - Footprint example

<!-- image -->

<!-- image -->

## 9.2 UFDFPN8 (DFN8) package information

This UFDFPN is an 8-lead, 2 x 3 mm, 0.5 mm pitch ultra thin profile fine pitch dual flat package.

Figure 18. UFDFPN8 - Outline

<!-- image -->

<!-- image -->

<!-- image -->

1. The maximum package warpage is 0.05 mm.
2. Exposed copper is not systematic and can appear partially or totally according to the cross section.
3. Drawing is not to scale.
4. The central pad (the area E2 by D2 in the above illustration) must be either connected to V SS  or left floating (not connected) in the end application.

<!-- image -->

<!-- image -->

## M24128-BW M24128-BR M24128-BF M24128-DF

Table 19. UFDFPN8 - Mechanical data

| Symbol  millimeters  inches (1)  Min  Typ  Max  Min  Typ  Max  A  0.450  0.550  0.600  0.0177  0.0217  0.0236  A1  0.000  0.020  0.050  0.0000  0.0008  0.0020  b (2)  0.200  0.250  0.300  0.0079  0.0098  0.0118  D  1.900  2.000  2.100  0.0748  0.0787  0.0827  D2  1.200  -  1.600  0.0472  -  0.0630  E  2.900  3.000  3.100  0.1142  0.1181  0.1220  E2  1.200  -  1.600  0.0472  -  0.0630  e  -  0.500  -  -  0.0197  -  K  0.300  -  -  0.0118  -  -  L  0.300  -  0.500  0.0118  -  0.0197  L1  -  -  0.150  -  -  0.0059  L3  0.300  -  -  0.0118  -  -  aaa  -  -  0.150  -  -  0.0059  bbb  -  -  0.100  -  -  0.0039  ccc  -  -  0.100  -  -  0.0039  ddd  -  -  0.050  -  -  0.0020  eee (3)  -  -  0.080  -  -  0.0031   |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

1. Values in inches are converted from mm and rounded to four decimal digits.
2. Dimension b applies to the plated terminal and is measured between 0.15 and 0.30 mm from the terminal tip.
3. Applied for exposed die paddle and terminals. Exclude embedding part of the exposed die paddle from measuring.
1. Dimensions are expressed in millimeters.

Figure 19. UFDFPN8 - Footprint example

<!-- image -->

<!-- image -->

## 9.3 TSSOP8 package information

This TSSOP is an 8-lead, 3 x 6.4 mm, 0.65 mm pitch, thin shrink small outline package.

Figure 20. TSSOP8 - Outline

<!-- image -->

## 1. Drawing is not to scale.

<!-- image -->

<!-- image -->

Table 20. TSSOP8 - Mechanical data

| Symbol  millimeters  inches  (1)  Min.  Typ.  Max.  Min.  Typ.  Max.  A  -  -  1.200  -  -  0.0472  A1  0.050  -  0.150  0.0020  -  0.0059  A2  0.800  1.000  1.050  0.0315  0.0394  0.0413  b  0.190  -  0.300  0.0075  -  0.0118  c  0.090  -  0.200  0.0035  -  0.0079  D (2)  2.900  3.000  3.100  0.1142  0.1181  0.1220  e  -  0.650  -  -  0.0256  -  E  6.200  6.400  6.600  0.2441  0.2520  0.2598  E1 (3)  4.300  4.400  4.500  0.1693  0.1732  0.1772  L  0.450  0.600  0.750  0.0177  0.0236  0.0295  L1  -  1.000  -  -  0.0394  -  k  0°  -  8°  0°  -  8°  aaa  -  -  0.100  -  -  0.0039   |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

1. Values in inches are converted from mm and rounded to four decimal digits.
2. Dimension D does not include mold flash, protrusions, or gate burrs. Mold flash, protrusions, or gate burrs shall not exceed 0.15 mm per side.
3. Dimension E1 does not include interlead flash or protrusions. Interlead flash or protrusions shall not exceed 0.25 mm per side.

<!-- image -->

Note:

## M24128-BW M24128-BR M24128-BF M24128-DF

The package top may be smaller than the package bottom. Dimensions D and E1 are determinated at the outermost extremes of the plastic body exclusive of the mold flash, tie bar burrs, gate burrs, and interleads flash, but including any mismatch between the top and bottom of the plastic body. The measurement side for the mold flash, protrusions, or gate burrs is the bottom side.

Figure 21. TSSOP8 - Footprint example

<!-- image -->

## 1. Dimensions are expressed in millimeters.

<!-- image -->

## 9.4 SO8N package information

This SO8N is an 8-lead, 4.9 x 6 mm, plastic small outline, 150 mils body width, package.

Figure 22. SO8N - Outline

<!-- image -->

<!-- image -->

## 1. Drawing is not to scale.

Table 21. SO8N - Mechanical data

| Symbol  millimeters  inches  (1)  Min.  Typ.  Max.  Min.  Typ.  Max.  A  -  -  1.750  -  -  0.0689  A1  0.100  -  0.250  0.0039  -  0.0098  A2  1.250  -  -  0.0492  -  -  b  0.280  -  0.480  0.0110  -  0.0189  c  0.170  -  0.230  0.0067  -  0.0091  D (2)  4.800  4.900  5.000  0.1890  0.1929  0.1969  E  5.800  6.000  6.200  0.2283  0.2362  0.2441  E1 (3)  3.800  3.900  4.000  0.1496  0.1535  0.1575  e  -  1.270  -  -  0.0500  -  h  0.250  -  0.500  0.0098  -  0.0197  k  0°  -  8°  0°  -  8°  L  0.400  -  1.270  0.0157  -  0.0500  L1  -  1.040  -  -  0.0409  -  ccc  -  -  0.100  -  -  0.0039   |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

1. Values in inches are converted from mm and rounded to four decimal digits.
2. Dimension D does not include mold flash, protrusions, or gate burrs. Mold flash, protrusions, or gate burrs shall not exceed 0.15 mm per side
3. Dimension E1 does not include interlead flash or protrusions. Interlead flash or protrusions shall not exceed 0.25 mm per side.

The package top may be smaller than the package bottom. Dimensions D and E1 are determinated at the outermost extremes of the plastic body exclusive of mold flash, tie bar burrs, gate burrs, and interleads flash, but including any mismatch between the top and bottom of the plastic body. The measurement side for mold flash, protusions, or gate burrs is the bottom side.

## Note:

<!-- image -->

## Figure 23. SO8N - Footprint example

<!-- image -->

1. Dimensions are expressed in millimeters.

<!-- image -->

## 9.5 WLCSP8 (CS) package information

WLCSP8 is a 8-bump, 1.289 x 1.099 mm, 0.4 mm pitch wafer level chip scale package.

Figure 24.  WLCSP8 - Outline

Package WLCSP8 (package code 1C)

<!-- image -->

Wafer back side Side view

<!-- image -->

<!-- image -->

1. Drawing is not to scale.
2. Primary datum Z and seating plane are defined by the spherical crowns of the bump.
3. Bump position designation per JESD 95-1, SPP-010.

<!-- image -->

1Ch\_WLCSP8\_ME\_V4

<!-- image -->

## M24128-BW M24128-BR M24128-BF M24128-DF

Table 22. WLCSP8 - Mechanical data

| Symbol  millimeters  inches (1)  Min  Typ  Max  Min  Typ  Max  A  0.500  0.540  0.580  0.0197  0.0213  0.0228  A1  -  0.190  -  -  0.0075  -  A2  -  0.350  -  -  0.0138  -  b (2)  -  0.270  -  -  0.0106  -  D  -  1.289  1.309  -  0.0507  0.0515  E  -  1.099  1.119  -  0.0433  0.0441  e  -  0.800  -  -  0.0315  -  e1  -  0.693  -  -  0.0273  -  e2  -  0.400  -  -  0.0157  -  e3  -  0.400  -  -  0.0157  -  F  -  0.203  -  -  0.0080  -  G  -  0.245  -  -  0.0096  -  H  -  0.203  -  -  0.0080  -  aaa  -  0.110  -  -  0.0043  -  bbb  -  0.110  -  -  0.0043  -  ccc  -  0.110  -  -  0.0043  -  ddd  -  0.060  -  -  0.0024  -  eee  -  0.060  -  -  0.0024  -   |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

1. Values in inches are converted from mm and rounded to four decimal digits.
2. Dimension is measured at the maximum bump diameter parallel to primary datum Z.
1. Dimensions are expressed in millimeters.

Figure 25. WLCSP8 - Footprint example

<!-- image -->

<!-- image -->

## 10 Ordering information

<!-- image -->

/K or T = Manufacturing technology code

1. ECOPACK2 (RoHS compliant and free of brominated, chlorinated and antimony oxide flame retardants).
2. These process letters appear on the device package (marking) and on the shipment box. Contact your nearest ST Sales Office for further information

<!-- image -->

## Note:

Note:

90 = -40°C to 85°C

Table 24. Ordering information scheme (unsawn wafer)

<!-- image -->

For a list of available options (memory, package, and so on) or for further information on any aspect of this device, contact your nearest ST sales office.

Parts marked as ES or E or accompanied by an Engineering Sample notification letter are not yet qualified and therefore not approved for use in production. ST is not responsible for any consequences resulting from such use. In no event will ST be liable for the customer using any of these engineering samples in production. ST's Quality department must be contacted prior to any decision to use these engineering samples to run a qualification activity.

## M24128-BW M24128-BR M24128-BF M24128-DF

Ordering information

<!-- image -->

## Revision history

Table 25. Document revision history

| Date  Revision  Changes  12-Jan-2010  18  Section 4.9: ECC (error correction code) and write cycling modified.  23-Mar-2010  19  Removed PDIP package.  21-Nov-2011  20  Updated UFDFPN8 silhouette on cover page, Figure 16: UFDFPN8 (MLP8) - 8-lead ultra thin fine  pitch dual flat package no lead 2 × 3mm, package outline and Table 19: UFDFPN8 (MLP8) 8-lead  ultra thin fine pitch dual flat package no lead 2 x 3 mm, mechanical data to add MC version.  Renamed Figure 2.  Removed 'Available M24128-DF products' table.  Updated disclaimer on last page.  20-Jul-2012  21  Datasheet revision 20 split into:  •  M24128-125 datasheet for automotive products (range 3),  •  M24128-BW M24128-BR M24128-BF M24128-DF (this datasheet) for standard products  (range 6).  Updated  •  Cycling: 4 million cycles  •  Data retention: 200 years  •  Table 17: t CLQX , t NS  Added  •  Identification page (for M24128-D devices)  •  Table 17: t WLDL  and t DHWH  •  Table 18 (1 MHz)  20-Nov-2012  22  Corrected 'Device family' data in Table 23: Ordering information scheme.  04-Apr-2013  23  Document reformatted.  Removed footnote '3' in in Table 2. Device select code.  Renamed Figure 2 and Table 21: UFDFPN8 (MLP8) - 8-lead ultra thin fine pitch dual flat no lead, 2  x 3 mm, data.  Updated package information in Table 23.  20-Jan-2014  24  Changed MSB address in Section 5.1.2 Page write  Changed MSB and LSB address in Section 5.1.3 Write identification page (M24128-D only)  Updated Figure 15. AC waveforms  25-Nov-2014  25  Updated:  • Section 5.1.5  • Table 8 and Table 13  • Note 1 and 2 on Table 11  • Note 1 and 2 on Table 12  • Section 9  • Notes on Table 13, Table 14, Table 15, Table 16, Table 17 and Section 9.5 WLCSP8 (CS)  package information  Added:  • Figure 3  • Figure 2  • Note 8 on Table 15.  • Reference to Engineering sample on Table 23  Removed Note 2 on Table 14.   |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

<!-- image -->

## M24128-BW M24128-BR M24128-BF M24128-DF

| Date  Revision  Changes  03-Apr-2015  26  Added:  •  Unsawn wafer reference on cover page and Table Ordering information  Updated:  •  note 2 on Table 12. Memory cell data retention  02-Oct-2015  27  Updated Section: Dual flat package, no lead - package outline and Section UFDFPN5 - 1.7 x 1.4  mm  22-Jun-2016  28  Updated Section Ordering information scheme  14-Feb-2017  29  Update: Section: AC measurement condition, Section: WLCPS8 (CS) package information  13-Sep-2017  30  Added reference to DFN8 and DFN5 in: cover page figure, Figure 3. UFDFPN5 (DFN5) package  connections, UFDFPN5 (DFN5) package information, UFDFPN8 (DFN8) package information and  Section 10 Ordering information  Added Figure 4  23-Oct-2020  31  Updated:  • Section Features  • Figure 6. Block diagram  • Table 5. Absolute maximum ratings, Table 11. Cycling performance, Table 12. Memory cell  data retention, Table 13. DC characteristics (M24128-BW), Table 14. DC characteristics  (M24128-BR), Table 15. DC characteristics (M24128-BF, M24128-DF), Table 16. 400 kHz AC  characteristics , Table 17. 1 MHz AC characteristics, Table 23. Ordering information scheme  20-May-2022  32  Updated:  • Section 2.2 Serial data (SDA), Section 4.5 Device addressing  • Table 2, note 1 and 2 on Table 5, Table 13, Table 14, Table 15, Table 17, Table 20  • Figure 19, Figure 20, Figure 21  Added notes (2) and (3), and note in Table 20,  notes (2) and (3), and note in Table 21  19-Nov-2024  33  Updated:  •  Features  •  Section 1: Description  •  Figure 16. UFDFPN5 - Outline  •  Figure 18. UFDFPN8 - Outline  •  Table 20. TSSOP8 - Mechanical data   |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

<!-- image -->

## Contents

| 1  Description . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 2  2  Signal description . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4  2.1  Serial clock (SCL) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4  2.2  Serial data (SDA)  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4  2.3  Chip enable (E2, E1, E0) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4  2.4  Write control (WC). . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4  2.5  VSS (ground) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4  2.6  Supply voltage (V CC )  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5  2.6.1  Operating supply voltage (V CC ). . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5  2.6.2  Power-up conditions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5  2.6.3  Device reset . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5  2.6.4  Power-down conditions. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5  3  Memory organization . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6  4  Device operation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7  4.1  Start condition . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8  4.2  Stop condition . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8  4.3  Data input. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8  4.4  Acknowledge bit (ACK). . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8  4.5  Device addressing. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 9  5  Instructions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .10  5.1  Write operations  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 10  5.1.1  Byte write . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 11  5.1.2  Page write. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 12  5.1.3  Write identification page (M24128-D only). . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 13  5.1.4  Lock identification page (M24128-D only) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 13  5.1.5  ECC (error correction code) and write cycling . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 13  5.1.6  Minimizing write delays by polling on ACK  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 14  5.2  Read operations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 15  5.2.1  Random address read. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 16  5.2.2  Current address read  .  .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 16  5.2.3  Sequential read. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 16  5.3  Read identification page (M24128-D only). . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 16  5.4  Read the lock status (M24128-D only) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 16  6  Initial delivery state . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .17   |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

<!-- image -->

## M24128-BW M24128-BR M24128-BF M24128-DF

Contents

| 7  Maximum ratings . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .18  8  DC and AC parameters . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .19  9  Package information. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .28  9.1  UFDFPN5 (DFN5) package information. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 28  9.2  UFDFPN8 (DFN8) package information. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 30  9.3  TSSOP8 package information . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 32  9.4  SO8N package information . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 34  9.5  WLCSP8 (CS) package information . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 36  10  Ordering information . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .38  Revision history . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .40   |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

<!-- image -->

## List of tables

| Table 1.  Signal names  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . . . . 2  Table 2.  Device select code. . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . . . . 9  Table 3.  Most significant address byte. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . . . . . . . . 10  Table 4.  Least significant address byte . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . . . . . . . . 10  Table 5.  Absolute maximum ratings  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . . . . . . . . 18  Table 6.  Operating conditions (voltage range W)  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . . . . . . . . 19  Table 7.  Operating conditions (voltage range R). . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 19  Table 8.  Operating conditions (voltage range F) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 19  Table 9.  AC measurement conditions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . 19  Table 10.  Input parameters . . . . . . . . . . . . . . . . . . . . . . . . . .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . . . . . . . . 20  Table 11.  Cycling performance  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . . . . . . . . 20  Table 12.  Memory cell data retention  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . . . . . . . . 20  Table 13.  DC characteristics (M24128-BW) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 21  Table 14.  DC characteristics (M24128-BR) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 22  Table 15.  DC characteristics (M24128-BF, M24128-DF) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 23  Table 16.  AC characteristics in Fast-mode  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  .  .  .  .  .  . . . . . . . . 24  Table 17.  AC characteristics in Fast-mode Plus . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 25  Table 18.  UFDFPN5 - Mechanical data. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 29  Table 19.  UFDFPN8 - Mechanical data. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 31  Table 20.  TSSOP8 - Mechanical data . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  .  .  .  .  .  . . . . . . . . 32  Table 21.  SO8N - Mechanical data. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  .  .  .  .  .  .  .  .  .  . . . . . . . . 34  Table 22.  WLCSP8 - Mechanical data. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . 37  Table 23.  Ordering information scheme. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  .  .  .  .  .  . . . . . . . . 38  Table 24.  Ordering information scheme (unsawn wafer) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 39  Table 25.  Document revision history. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . . . . . . . . 40   |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

## M24128-BW M24128-BR M24128-BF M24128-DF

List of tables

<!-- image -->

## List of figures

| Figure 1.  Logic diagram. . . . . . . . . . . . . . . . . . . . . . . .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . . . . 2  Figure 2.  8-pin package connections, top view . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 2  Figure 3.  UFDFPN5 (DFN5) package connections . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3  Figure 4.  WLCSP connections for the M24128-DFCS6TP/K. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3  Figure 5.  Chip enable inputs connection  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . . . . 4  Figure 6.  Block diagram  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . . . . 6  Figure 7.  I²C bus protocol  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . . . . 7  Figure 8.  Write mode sequences with WC = 0 (data write enabled) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  11  Figure 9.  Write mode sequences with WC = 1 (data write inhibited). . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 12  Figure 10.  Write cycle polling flowchart using ACK . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 14  Figure 11.  Read mode sequences . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  .  .  .  . . . . . . . . 15  Figure 12.  AC measurement I/O waveform . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 19  Figure 13.  Rbus value versus bus parasitic capacitance (C bus ) for an I 2 C bus  (f C  = 400 kHz)  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . . . . . . . . 26  Figure 14.  Rbus value versus bus parasitic capacitance (C bus ) for an I 2 C bus (f C  = 1 MHz). . . . . . . . . . . . . . . . . . . . . . . 26  Figure 15.  AC waveforms . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . . . . . . . . 27  Figure 16.  UFDFPN5 - Outline. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . . . . . . . . 28  Figure 17.  UFDFPN5 - Footprint example . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 29  Figure 18.  UFDFPN8 - Outline. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . . . . . . . . 30  Figure 19.  UFDFPN8 - Footprint example . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 31  Figure 20.  TSSOP8 - Outline  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . . . . . . . . 32  Figure 21.  TSSOP8 - Footprint example . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 33  Figure 22.  SO8N - Outline. . . . . . . . . . . . . . . . . . . . . . . . . . .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . . . . . . . . 34  Figure 23.  SO8N - Footprint example . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  .  .  .  .  .  .  .  .  . . . . . . . . 35  Figure 24.  WLCSP8 - Outline. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . . . . . . . . 36  Figure 25.  WLCSP8 - Footprint example . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 37   |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

## M24128-BW M24128-BR M24128-BF M24128-DF

List of figures

<!-- image -->

## IMPORTANT NOTICE - READ CAREFULLY

STMicroelectronics NV and its subsidiaries ('ST') reserve the right to make changes, corrections, enhancements, modifications, and improvements to ST products and/or to this document at any time without notice. Purchasers should obtain the latest relevant information on ST products before placing orders. ST products are sold pursuant to ST's terms and conditions of sale in place at the time of order acknowledgment.

Purchasers are solely responsible for the choice, selection, and use of ST products and ST assumes no liability for application assistance or the design of purchasers' products.

No license, express or implied, to any intellectual property right is granted by ST herein.

Resale of ST products with provisions different from the information set forth herein shall void any warranty granted by ST for such product.

ST and the ST logo are trademarks of ST. For additional information about ST trademarks, refer to www.st.com/trademarks. All other product or service names are the property of their respective owners.

Information in this document supersedes and replaces information previously supplied in any prior versions of this document.

© 2024 STMicroelectronics - All rights reserved