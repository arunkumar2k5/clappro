<!-- image -->

## 24AA128/24LC128/24FC128

## 128-Kbit I 2 C Serial EEPROM

## Device Selection Table

| Part Number  VCC Range  Maximum Clock  Frequency  Temperature  Ranges  Available Packages  24AA128  1.7V-5.5V  400 kHz  (1)  I, E  MF, MS, P, SN, SM, MNY, ST  24LC128  2.5V-5.5V  400 kHz  I, E  MF, MS, P, SN, SM, MNY, ST  24FC128  1.7V-5.5V  1 MHz  (2)  I, E  MF, MS, P, SN, SM, MNY, ST   |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

Note

1:

100 kHz for VCC &lt; 2.5V.

2:

400 kHz for VCC &lt; 2.5V.

## Features

- Single Supply with Operation down to 1.7V for 24AA128/24FC128 devices, 2.5V for 24LC128 Devices
- Low-Power CMOS Technology:
- -Write current 3 mA, maximum
- -Standby current 1 µA, maximum (I-temp.)
- Two-Wire Serial Interface, I 2 C Compatible
- Cascadable up to Eight Devices
- Schmitt Trigger Inputs for Noise Suppression
- Output Slope Control to Eliminate Ground Bounce
- 100 kHz, 400 kHz and 1 MHz Compatibility
- Page Write Time: 5 ms, Maximum
- Self-Timed Erase/Write Cycle
- 64-Byte Page Write Buffer
- Hardware Write-Protect
- ESD Protection &gt; 4,000V
- More than 1 Million Erase/Write Cycles
- Data Retention &gt; 200 years
- Factory Programming Available
- RoHS Compliant
- Temperature Ranges:
- Automotive AEC-Q100 Qualified

- Industrial (I):

- -40  C to +85  C

- Extended (E)

- -40  C to +125  C

## Packages

- 8-Lead DFN, 8-Lead MSOP, 8-Lead PDIP, 8-Lead SOIC, 8-Lead SOIJ, 8-Lead TDFN and 8-Lead TSSOP

## Description

The Microchip Technology Inc. 24XX128 ( 1 ) is a 16K x 8 (128 Kbit) Serial Electrically Erasable PROM (EEPROM),  capable  of  operation  across  a  broad voltage range (1.7V to 5.5V). It has been developed for advanced,  low-power  applications  such  as  personal communications or data acquisition. This device also has a page write capability of up to 64 bytes of data. This device is capable of both random and sequential reads  up  to  the  128K  boundary.  Functional  address lines allow up to eight devices on the same bus, for up to 1 Mbit address space.

Note 1: 24XX128 is used in this document as a generic part number for the 24AA128/24LC128/24FC128 devices.

## Package Types

<!-- image -->

## 24AA128/24LC128/24FC128

## Block Diagram

<!-- image -->

## 24AA128/24LC128/24FC128

## 1.0 ELECTRICAL CHARACTERISTICS

## Absolute Maximum Ratings (†)

| VCC.............................................................................................................................................................................6.5V  All inputs and outputs w.r.t. VSS ..........................................................................................................-0.6V to VCC +1.0V  Storage temperature ............................................................................................................................... -65°C to +150°C  Ambient temperature with power applied................................................................................................-40°C to +125°C  ESD protection on all pins    4 kV   |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

† NOTICE: Stresses above those listed under 'Absolute Maximum Ratings' may cause permanent damage to the device. This is a stress rating only, and functional operation of the device at those or any other conditions above those indicated  in  the  operational  listings  of  this  specification  is  not  implied.  Exposure  to  Absolute  Maximum  Rating conditions for extended periods may affect device reliability.

## TABLE 1-1: DC CHARACTERISTICS

Note 1: This parameter is periodically sampled and not 100% tested.

| DC CHARACTERISTICS  Industrial (I):  VCC = +1.7V to 5.5V  TA = -40°C to +85°C  Extended (E):  VCC = +2.5V to 5.5V  TA = -40°C to +125°C  Param.  No.  Symbol  Characteristic  Minimum  Maximum  Units  Conditions  D1  VIH  High-Level Input Voltage  0.7 VCC  -  V  D2  VIL  Low-Level Input Voltage  -  0.3 VCC  V  VCC    2.5V  -  0.2 VCC  V  VCC &lt; 2.5V  D3  VHYS  Hysteresis of Schmitt Trigger  Inputs (SDA, SCL pins)  0.05 VCC  -  V  VCC    2.5V  (Note 1)  D4  VOL  Low-Level Output Voltage  -  0.40  V  IOL = 3.0 mA @ VCC = 4.5V  IOL = 2.1 mA @ VCC = 2.5V  D5  ILI  Input Leakage Current  -  ±1  µA  VIN = VSS or VCC, WP = VSS  VIN = VSS or VCC, WP = VCC  D6  ILO  Output Leakage Current  -  ±1  µA  VOUT = VSS or VCC  D7  CIN,  COUT  Pin Capacitance  (all inputs/outputs)  -  10  pF  VCC = 5.0V  (Note 1)  TA = +25°C, FCLK = 1 MHz  D8  ICC Read  Operating Current  -  400  µA  VCC = 5.5V, SCL = 400 kHz  D9  ICC Write  -  3  mA  VCC = 5.5V  D10  ICCS  Standby Current  -  1  µA  SDA = SCL = VCC = 5.5V  A0, A1, A2, WP = VSS, I-Temp  -  5  µA  SDA = SCL = VCC = 5.5V  A0, A1, A2, WP = VSS, E-Temp   |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

## 24AA128/24LC128/24FC128

TABLE 1-2: AC CHARACTERISTICS

| AC CHARACTERISTICS  Industrial (I):  VCC = +1.7V to 5.5V  TA = -40°C to +85°C  Extended (E):  VCC = +2.5V to 5.5V  TA = -40°C to +125°C  Param.  No.  Symbol  Characteristic  Minimum  Maximum  Units  Conditions  1  FCLK  Clock Frequency  -  100  kHz  1.7V    VCC    2.5V  -  400  kHz  2.5V    VCC    5.5V  -  400  kHz  1.7V    VCC    2.5V  (24FC128)  -  1000  kHz  2.5V    VCC    5.5V  (24FC128)  2  THIGH  Clock High Time  4000  -  ns  1.7V    VCC    2.5V  600  -  ns  2.5V    VCC    5.5V  600  -  ns  1.7V    VCC    2.5V  (24FC128)  500  -  ns  2.5V    VCC    5.5V  (24FC128)  3  TLOW  Clock Low Time  4700  -  ns  1.7V    VCC    2.5V  1300  -  ns  2.5V    VCC    5.5V  1300  -  ns  1.7V    VCC    2.5V  (24FC128)  500  -  ns  2.5V    VCC    5.5V  (24FC128)  4  TR  SDA and SCL Rise Time  -  1000  ns  1.7V    VCC    2.5V  (Note 1)  -  300  ns  2.5V    VCC    5.5V  (Note 1)  -  300  ns  1.7V    VCC    5.5V  (24FC128)  (Note 1)  5  TF  SDA and SCL Fall Time  -  300  ns  All except, 24FC128  (Note 1)  -  100  ns  1.7V    VCC    5.5V  (24FC128)  (Note 1)  6  THD:STA  Start Condition Hold Time  4000  -  ns  1.7V    VCC    2.5V  600  -  ns  2.5V    VCC    5.5V  600  -  ns  1.7V    VCC    2.5V  (24FC128)  250  -  ns  2.5V    VCC    5.5V  (24FC128)  7  TSU:STA  Start Condition Setup Time  4700  -  ns  1.7V    VCC    2.5V  600  -  ns  2.5V    VCC    5.5V  600  -  ns  1.7V    VCC    2.5V  (24FC128)  250  -  ns  2.5V    VCC    5.5V  (24FC128)  8  THD:DAT  Data Input Hold Time  0  -  ns  Note 2  9  TSU:DAT  Data Input Setup Time  250  -  ns  1.7V    VCC    2.5V  100  -  ns  2.5V    VCC    5.5V  100  -  ns  1.7V    VCC    5.5V  (24FC128)  10  TSU:STO  Stop Condition Setup Time  4000  -  ns  1.7V    VCC    2.5V  600  -  ns  2.5V    VCC    5.5V  600  -  ns  1.7V    VCC    2.5V  (24FC128)  250  -  ns  2.5V    VCC    5.5V  (24FC128)   |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

Note 1: Not 100% tested. CB = total capacitance of one bus line in pF.

2: As a transmitter, the device must provide an internal minimum delay time to bridge the undefined region (minimum 300 ns) of the falling edge of SCL to avoid unintended generation of Start or Stop conditions.

3: The combined TSP and VHYS specifications are due to new Schmitt Trigger inputs, which provide improved noise spike suppression. This eliminates the need for a TI specification for standard operation.

4: This parameter is not tested but is ensured by characterization.

## 24AA128/24LC128/24FC128

TABLE 1-2: AC CHARACTERISTICS (CONTINUED)

| 11  TSU:WP  WP Setup Time  4000  -  ns  1.7V    VCC    2.5V  600  -  ns  2.5V    VCC    5.5V  600  -  ns  1.7V    VCC    5.5V  (24FC128)  12  THD:WP  WP Hold Time  4700  -  ns  1.7V    VCC    2.5V  1300  -  ns  2.5V    VCC    5.5V  1300  -  ns  1.7V    VCC    5.5V  (24FC128)  13  TAA  Output Valid From Clock  -  3500  ns  1.7V    VCC    2.5V  (Note 2)  -  900  ns  2.5V    VCC    5.5V  (Note 2)  -  900  ns  1.7V    VCC    2.5V  (24FC128)  (Note 2)  -  400  ns  2.5V    VCC    5.5V  (24FC128)  (Note 2)  14  TBUF  Bus Free Time: The Time The  Bus Must Be Free Before a  New Transmission Can Start  4700  -  ns  1.7V    VCC    2.5V  1300  -  ns  2.5V    VCC    5.5V  1300  -  ns  1.7V    VCC    2.5V  (24FC128)  500  -  ns  2.5V    VCC    5.5V  (24FC128)  15  TOF  Output Fall Time from VIH  Minimum to VIL Maximum  CB    100 pF  10 +  0.1CB  250  ns  All except, 24FC128  (Note 1)  -  250  ns  24FC128  (Note 1)  16  TSP  Input Filter Spike Suppression  (SDA and SCL pins)  -  50  ns  All except, 24FC128  (Notes 1  and Note 3)  17  TWC  Write Cycle Time  (byte or page)  -  5  ms  18  Endurance  1,000,000  -  cycles  +25°C, 5.5V, Page Mode  (Note 4)  AC CHARACTERISTICS  Industrial (I):  VCC = +1.7V to 5.5V  TA = -40°C to +85°C  Extended (E):  VCC = +2.5V to 5.5V  TA = -40°C to +125°C  Param.  No.  Symbol  Characteristic  Minimum  Maximum  Units  Conditions   |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

- 3: The combined TSP and VHYS specifications are due to new Schmitt Trigger inputs, which provide improved noise spike suppression. This eliminates the need for a TI specification for standard operation.

4: This parameter is not tested but is ensured by characterization.

## 24AA128/24LC128/24FC128

## FIGURE 1-1: BUS TIMING DATA

<!-- image -->

## 2.0 PIN DESCRIPTIONS

The descriptions of the pins are listed in Table 2-1.

## TABLE 2-1: PIN FUNCTION TABLE

Note 1: The exposed pad on the DFN/TDFN package can be connected to VSS or left floating.

| Name  DFN (1)  MSOP  PDIP  SOIC  SOIJ  TDFN (1)  TSSOP  Function  A0  1  -  1  1  1  1  1  User Configurable Chip Select  A1  2  -  2  2  2  2  2  User Configurable Chip Select  A2  3  3  3  3  3  3  3  User Configurable Chip Select  VSS  4  4  4  4  4  4  4  Ground  SDA  5  5  5  5  5  5  5  Serial Address/Data I/O  SCL  6  6  6  6  6  6  6  Serial Clock  WP  7  7  7  7  7  7  7  Write-Protect Input  VCC  8  8  8  8  8  8  8  Power Supply   |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

## 2.1 A0, A1, A2 Chip Address Inputs

The A0, A1 and A2 inputs are used by the 24XX128 for multiple device operations. The levels on these inputs are compared with the corresponding bits in the client address. The chip is selected if the compare is true.

Note: For the MSOP package only, pins A0 and A1 are not connected.

Up to eight devices (two for the MSOP package) may be connected to the same bus by using different Chip Select bit combinations.  These inputs must  be connected to either VCC or VSS.

In  most  applications,  the  chip  address  inputs A0, A1 and  A2  are  hardwired  to  logic  ' 0 '  or  logic  ' 1 '.  For applications  in  which  these  pins  are  controlled  by  a microcontroller or other programmable device, the chip address  pins  must  be  driven  to  logic  ' 0 '  or  logic  ' 1 ' before normal device operation can proceed.

## 2.2 Serial Data (SDA)

This is a bidirectional pin used to transfer addresses and data into and out of the device. It is an open-drain terminal.  Therefore,  the  SDA  bus  requires  a  pull-up resistor  to  VCC  (typical  10 k  for  100 kHz,  2 k  for 400 kHz and 1 MHz).

For  normal  data  transfer,  SDA  is  allowed  to  change only  during  SCL  low.  Changes  during  SCL  high  are reserved for indicating the Start and Stop conditions.

## 2.3 Serial Clock (SCL)

This input is used to synchronize the data transfer to and from the device.

## 2.4 Write-Protect (WP)

This pin must be connected to either VSS or VCC. If tied to  VSS,  write  operations  are  enabled.  If  tied  to  VCC, write operations are inhibited but read operations are not affected.

## 24AA128/24LC128/24FC128

## 3.0 FUNCTIONAL DESCRIPTION

The 24XX128 supports a bidirectional two-wire bus and data transmission protocol. A device that sends data onto the bus is defined as a transmitter and a device receiving data as a receiver.  The  bus  must  be controlled by a host device, which generates the Serial Clock (SCL), controls the bus access and generates the Start and Stop conditions while the 24XX128 works as  a  client.  Both  host  and  client  can  operate  as  a transmitter or receiver, but the host device determines which mode is activated.

## 4.0 BUS CHARACTERISTICS

The following bus protocol has been defined:

- Data transfer may be initiated only when the bus is not busy.
- During data transfer, the data line must remain stable whenever the clock line is high. Changes in the data line while the clock line is high will be interpreted as a Start or Stop condition.

Accordingly,  the  following  bus  conditions  have  been defined (Figure 4-1).

## 4.1 Bus Not Busy (A)

Both data and clock lines remain high.

## 4.2 Start Data Transfer (B)

A high-to-low transition of the SDA line while the clock (SCL) is high determines a Start condition.  All commands must be preceded by a Start condition.

## 4.3 Stop Data Transfer (C)

A low-to-high transition of the SDA line while the clock (SCL) is high determines a Stop condition. All operations must end with a Stop condition.

## 4.4 Data Valid (D)

The state of the data line represents valid data when, after  a  Start  condition,  the  data  line  is  stable  for  the duration of the high period of the clock signal.

The data on the line must be changed during the low period of the clock signal. There is one bit of data per clock pulse.

Each data transfer is initiated with a Start condition and terminated with a Stop condition. The number of the data  bytes  transferred  between  the  Start  and  Stop conditions  is  determined  by  the  host  device  and  is, theoretically, unlimited (although only the last 64 will be stored when  doing  a  write  operation).  When  an overwrite does occur, it will replace data on  a First-In First-Out (FIFO) principle.

## 4.5 Acknowledge

Each receiving device, when addressed, is obliged to generate an Acknowledge signal after the reception of each  byte.  The  host  device  must  generate  an  extra clock pulse, which is associated with this Acknowledge bit.

Note:

The  24XX128  does  not  generate  any Acknowledge bits if an internal programming cycle is in progress.

A device that acknowledges must pull down the SDA line during the Acknowledge clock pulse in such a way that the SDA line is stable-low during the high period of the Acknowledge-related clock pulse. Moreover, setup and  hold  times  must  be  taken  into  account.  During reads, a host must signal an end of data to the client by not generating an Acknowledge bit on the last byte that has  been  clocked  out  of  the  client.  In  this  case,  the client (24XX128) will leave the data line high to enable the host to generate the Stop condition.

FIGURE 4-1: DATA TRANSFER SEQUENCE ON THE SERIAL BUS

<!-- image -->

## FIGURE 4-2: ACKNOWLEDGE TIMING

<!-- image -->

## 5.0 DEVICE ADDRESSING

A  control  byte  is  the  first  byte  received  following  the Start condition from the host device. The control byte consists of a 4-bit control code. For the 24XX128, this is  set  as ' 1010 '  binary for read and write operations. The  next  three  bits  of  the  control  byte  are  the  Chip Select bits (A2, A1, A0). The Chip Select bits allow the use of up to eight 24XX128 devices on the same bus and are used to select which device is accessed. The Chip Select bits in the control byte must correspond to the  logic  levels  on  the  corresponding A2, A1  and A0 pins for the device to respond. These bits, in effect, are the three Most Significant bits of the word address. The combination of the 4-bit control code and the next three bits are called the client address.

For the MSOP package, the A0 and A1 pins are not connected. During device addressing, the A0 and A1 Chip Select bits (Figure 5-1 and Figure 5-2) should be set to ' 0 '. Only two 24XX128 MSOP packages can be connected to the same bus.

The last bit of the control byte is the Read/Write (R/W) bit, and it defines the operation to be performed. When set to a ' 1 ', a read operation is selected. When set to a ' 0 ', a write operation is selected. The next two bytes received  define  the  address  of  the  first  data  byte (Figure 5-2).  Because  only  A13…A0  are  used,  the upper two address bits are 'don't care' bits. The upper address bits are transferred first, followed by the Less Significant bits.

## FIGURE 5-1: CONTROL BYTE

## FORMAT

<!-- image -->

## 5.1 Contiguous Addressing Across Multiple Devices

The Chip Select  bits A2, A1  and A0  can  be  used  to expand the contiguous address space for up to 1 Mbit by adding up to eight 24XX128 devices on the same bus. In this case, software can use A0 of the control byte as address bit A14, A1 as address bit A15, and A2 as  address  bit A16.  It  is  not  possible  to  sequentially read across device boundaries.

Following  the  Start  condition,  the  24XX128  monitors the SDA bus, checking the device type identifier being transmitted. Upon receiving a ' 1010 ' code and appropriate device select bits, the client device outputs an Acknowledge signal on the SDA line. Depending on the state of the R/W bit, the 24XX128 will select a read or write operation.

For the MSOP package, up to two 24XX128 devices can be added for up to 256 Kbit of address space. In this case, software can use A2 of the control byte as address  bit A16.  Bits A0  (A14)  and A1  (A15)  of  the control  byte  must  always  be  set  to  logic  ' 0 '  for  the MSOP.

FIGURE 5-2: ADDRESS SEQUENCE BIT ASSIGNMENTS

<!-- image -->

## 6.0 WRITE OPERATIONS

## 6.1 Byte Write

Following the Start condition from the host, the control code (4 bits), the Chip Select (3 bits) and the R/W bit (which is a logic low) are clocked onto the bus by the host transmitter. This indicates to the addressed client receiver that the address high byte will follow after it has  generated  an Acknowledge  bit  during  the  ninth clock cycle. Therefore, the next byte transmitted by the host is the high-order byte of the word address and will be  written  into  the Address  Pointer  of  the  24XX128. The next byte  is  the  Least  Significant Address  Byte. After  receiving  another Acknowledge  signal  from  the 24XX128, the host device will transmit the data word to be  written  into  the  addressed  memory  location.  The 24XX128 acknowledges again, and the host generates a Stop condition. This initiates the internal write cycle and  during  this  time,  the  24XX128  will  not  generate Acknowledge  signals  (Figure 6-1).  If  an  attempt  is made to write to the array with the WP pin held high, the device  will  acknowledge  the  command,  but  no  write cycle will occur, no data will be written and the device will immediately accept a new command. After a byte write command, the internal address counter will point to the address location following the one that was just written.

Note:

When doing a write of less than 64 bytes,

the  data  in  the  rest  of  the  page  are refreshed along with the data bytes being written.  This  forces  the  entire  page  to endure  a  write  cycle.  For  this  reason, endurance is specified per page.

## 6.2 Page Write

The write control byte, word address and the first data byte are transmitted to the 24XX128 in much the same way as in a byte write. The exception is that instead of generating a Stop condition, the host transmits up to 63 additional  bytes,  which  are  temporarily  stored  in  the on-chip  page  buffer  and  will  be  written  into  memory

FIGURE 6-1: BYTE WRITE

<!-- image -->

| x x  Bus Activity  Host  SDA Line  Bus Activity  S  T  A  R  T  Control  Byte  Address  High Byte  Address  Low Byte  Data  S  T  O  P  A  C  K  A  C  K  A  C  K  A  C  K  x  = 'don't care' bit  S  1 0 1 0  0  A  2  A  1  A  0  P   |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

## 24AA128/24LC128/24FC128

once the host has transmitted a Stop condition. Upon receipt of each word, the six lower Address Pointer bits, which form the byte counter, are internally incremented by one. If the host transmits more than 64 bytes prior to generating the Stop condition, the address counter will roll  over,  and  the  previously  received  data  will  be overwritten. As with the byte write operation, once the Stop condition is received, an internal write cycle will begin (Figure 6-2). If an attempt is made to write to the array  with  the  WP  pin  held  high,  the  device  will acknowledge  the  command,  but  no  write  cycle  will occur,  no  data  will  be  written  and  the  device  will immediately accept a new command.

Note:

Page  write  operations  are  limited  to writing  bytes  within  a  single  physical page, regardless of  the  number  of bytes actually being written. Physical page  boundaries  start  at  addresses that are integer multiples of the page buffer size (or 'page size') and end at addresses that are integer multiples of page size -1. If a page write command attempts to write across a physical page boundary, the result is that  the  data  wrap  around  to  the beginning of the current page (overwriting data previously stored there), instead of being written to the next page, as might be expected. It is, therefore, necessary for the application  software  to  prevent  page write operations that would attempt to cross a page boundary.

## 6.3 Write Protection

The WP pin allows the user to write-protect the entire array (0000-3FFF) when the pin is tied to VCC. If tied to VSS  the  write  protection  is  disabled.  The  WP  pin  is sampled  at  the  Stop  bit  for  every  write  command (Figure 1-1). Toggling the WP pin after the Stop bit will have no effect on the execution of the write cycle.

## 24AA128/24LC128/24FC128

## FIGURE 6-2: PAGE WRITE

<!-- image -->

## 7.0 ACKNOWLEDGE POLLING

Since the device will not acknowledge during a write cycle, this can be used to determine when the cycle is complete (this  feature  can  be  used  to  maximize  bus throughput).  Once  the  Stop  condition  for  a  write command has been issued from the host, the device initiates  the  internally  timed  write  cycle. ACK  polling can  be  initiated  immediately.  This  involves  the  host sending a Start condition, followed by the control byte for a write command (R/W = 0 ). If the device is still busy with the write cycle, then no ACK will be returned. If no ACK is returned, the Start bit and control byte must be resent.  If  the  cycle  is  complete,  then  the  device  will return the ACK, and the host can then proceed with the next read or write command. See Figure 7-1 for flow diagram.

FIGURE 7-1: ACKNOWLEDGE POLLING FLOW

<!-- image -->

## 8.0 READ OPERATION

Read operations are initiated in much the same way as write operations with the exception that the R/W bit of the  control  byte  is  set  to  one.  There  are  three  basic types of read operations: current address read, random read and sequential read.

## 8.1 Current Address Read

The 24XX128  contains an address counter that maintains  the  address  of  the  last  word  accessed, internally incremented by one. Therefore, if the previous read access was to address n (n is any legal address),  the  next  current  address  read  operation would access data from address n + 1 .

Upon receipt of the control byte with R/W bit set to ' 1 ', the 24XX128 issues an Acknowledge and transmits the 8-bit  data  word.  The  host  will  not  acknowledge  the transfer,  but  does generate a Stop condition and the 24XX128 discontinues transmission (Figure 8-1).

FIGURE 8-1: CURRENT ADDRESS READ

FIGURE 8-2: RANDOM READ

<!-- image -->

## 8.2 Random Read

Random read operations allow the host to access any memory location in a random manner. To perform this type of read operation, the word address must first be set. This is done by sending the word address to the 24XX128 as part of a write operation (R/W bit set to ' 0 '). Once the word address is sent, the host generates a  Start  condition  following  the  Acknowledge.  This terminates  the  write  operation,  but  not  before  the internal Address Pointer is set. The host then issues the control byte again, but with the R/W bit set to a ' 1 '.

The  24XX128  will  then  issue  an  Acknowledge  and transmit the 8-bit data word.  The host will not acknowledge  the  transfer  but  does  generate  a  Stop condition,  which  causes  the  24XX128  to  discontinue transmission (Figure 8-2). After a random read command, the internal address counter will point to the address location following the one that was just read.

## 8.3 Sequential Read

Sequential  reads  are  initiated  in  the  same  way  as  a random read, except that after the 24XX128 transmits the first data byte, the host issues an Acknowledge (as opposed to the Stop condition used in a random read). This Acknowledge directs the 24XX128 to transmit the next  sequentially  addressed  8-bit  word  (Figure 8-3). Following the final byte transmitted to the host, the host will not generate an Acknowledge but will generate a Stop condition.

To provide sequential reads, the 24XX128 contains an internal Address Pointer, which is incremented by one at  the  completion  of  each  operation.  This  Address Pointer allows the entire memory contents to be serially read during one operation.  The internal  Address Pointer will automatically roll over from address 3FFF to  address  0000  if  the  host  acknowledges  the  byte received from the array address 3FFF.

<!-- image -->

## 24AA128/24LC128/24FC128

## FIGURE 8-3: SEQUENTIAL READ

<!-- image -->

| Bus Activity  Host  SDA Line  Bus Activity  Control  Byte  Data (n)  Data (n + 1)  Data (n + 2)  Data (n +  x  )  N  O  A  C  K  A  C  K  A  C  K  A  C  K  A  C  K  S  T  O  P  P   |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

## 9.0 PACKAGING INFORMATION

## 9.1 Package Marking Information

8-Lead DFN-S

<!-- image -->

<!-- image -->

<!-- image -->

<!-- image -->

<!-- image -->

<!-- image -->

<!-- image -->

<!-- image -->

## 24AA128/24LC128/24FC128

## Package Marking Information (Continued)

<!-- image -->

| Part Number  ## 1 st  Line Marking Codes  TSSOP  MSOP  SOIC  SOIJ  DFN  TDFN  I-Temp  E-Temp  I-Temp  E-Temp  24AA128  4AC  AADU  4A128T (  1  )  24AA128T (  1  )  24AA128  24AA128  A81  A81  24LC128  4LC  4LC  4L128T (  1  )  24LC128T (  1  )  24LC128  24LC128  A84  A85  24FC128  4FC  4FC  4F128T (  1  )  24FC128T (  1  )  24FC128  24FC128  A8A  -   |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

Note 1: T = Temperature grade (I, E)

| Legend:  XX...X Part number or part number code  - T Temperature (I, E)  Y  Year code (last digit of calendar year)  YY  Year code (last 2 digits of calendar year)  WW  Week code (week of January 1 is week '01')  - NNN Alphanumeric traceability code (2 characters for small packages)  JEDEC ®  designator for Matte Tin (Sn)  Note: Standard OTP marking consists of Microchip part number, year code, week code, and traceability code.  Note:  For  very  small  packages  with  no  room  for  the  JEDEC ®   designator , the marking will only appear on the outer carton or reel label. e3  Note:  In the event the full Microchip part number cannot be marked on one line, it will be carried over to the next line, thus limiting the number of available characters for customer-specific information.  e3   |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

## 8-Lead Plastic Dual Flat, No Lead Package (MF) - 6x5 mm Body [DFN-S] Saw Singulated

For the most current package drawings, please see the Microchip Packaging Specification located at http://www.microchip.com/packaging Note:

<!-- image -->

Microchip Technology Drawing  C04-122 Rev D Sheet 1 of 2

## 24AA128/24LC128/24FC128

## 8-Lead Plastic Dual Flat, No Lead Package (MF) - 6x5 mm Body [DFN-S] Saw Singulated

For the most current package drawings, please see the Microchip Packaging Specification located at http://www.microchip.com/packaging Note:

<!-- image -->

## Notes:

| Number of Terminals  Overall Height  Terminal Width  Overall Width  Terminal Length  Exposed Pad Width  Terminal Thickness  Pitch  Standoff  Units  Dimension Limits  A1  A  b  E2  A3  e  L  E  N  1.27 BSC  0.20 REF  2.20  0.50  0.30  0.80  0.00  0.40  0.60  2.30  0.85  0.02  6.00 BSC  MILLIMETERS  MIN  NOM  8  2.40  0.75  0.50  1.00  0.05  MAX  K  -  0.20  -  Terminal-to-Exposed-Pad  Overall Length  Exposed Pad Length  D  D2  3.90  5.00 BSC  4.00  4.10   |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

1. Pin 1 visual index feature may vary, but must be located within the hatched area.
2. Package may have one ore more exposed tie bars at ends.
3. Package is saw singulated
4. Dimensioning and tolerancing per ASME Y14.5M

BSC: Basic Dimension. Theoretically exact value shown without tolerances.

REF: Reference Dimension, usually without tolerance, for information purposes only.

Microchip Technology Drawing  C04-122 Rev D Sheet 2 of 2

## 8-Lead Plastic Dual Flat, No Lead Package (MF) - 6x5 mm Body [DFN-S] Saw Singulated

For the most current package drawings, please see the Microchip Packaging Specification located at http://www.microchip.com/packaging Note:

<!-- image -->

## RECOMMENDED LAND PATTERN

| Dimension Limits  Units  Optional Center Pad Length  Optional Center Pad Width  Contact Pitch  Y2  X2  2.40  4.10  MILLIMETERS  1.27 BSC  MIN  E  MAX  Contact Pad Length (X20)  Contact Pad Width (X20)  Y1  X1  1.15  0.45  NOM  C  Contact Pad Spacing  5.60  Contact Pad to Center Pad (X20)  G1  0.20  Thermal Via Diameter  V  Thermal Via Pitch  EV  0.30  1.00   |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

## Notes:

- Dimensioning and tolerancing per ASME Y14.5M 1.
- BSC: Basic Dimension. Theoretically exact value shown without tolerances.
- For best soldering results, thermal vias, if used, should be filled or tented to avoid solder loss during reflow process 2.

Microchip Technology Drawing C04-2122 Rev D

## 8-Lead Plastic Micro Small Outline Package (MS) - 3x3 mm Body  [MSOP]

Note: http://www.microchip.com/packaging For the most current package drawings, please see the Microchip Packaging Specification located at

<!-- image -->

VIEW A-A

Microchip Technology Drawing C04-111-MS Rev F Sheet 1 of 2

## 8-Lead Plastic Micro Small Outline Package (MS) - 3x3 mm Body  [MSOP]

For the most current package drawings, please see the Microchip Packaging Specification located at http://www.microchip.com/packaging Note:

<!-- image -->

| Number of Terminals  Overall Height  Terminal Width  Overall Width  Terminal Length  Molded Package Width  Molded Package Thickness  Pitch  Standoff  Units  Dimension Limits  A1  A  b  E1  A2  e  L  E  N  0.65 BSC  0.85  0.40  0.22  -  0.00  -  0.60  -  -  MILLIMETERS  MIN  NOM  8  0.80  0.40  1.10  0.15  MAX  L1  0.95 REF  Footprint  Overall Length  D  3.00 BSC  Terminal Thickness  c  0.08  -  0.23  R  R1  ș  ș  1  -  0.07  -  Lead Bend Radius  -  0.07  -  Lead Bend Radius  -  0°  8°  Foot Angle  -  5°  15°  Mold Draft Angle  0.75  0.95  4.90 BSC  3.00 BSC   |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

## Notes:

1. Pin 1 visual index feature may vary, but must be located within the hatched area.
2. Dimensions D and E1 do not include mold flash or protrusions. Mold flash or protrusions shall not exceed 0.15mm per side.
3. Dimensioning and tolerancing per ASME Y14.5M 3.

BSC: Basic Dimension. Theoretically exact value shown without tolerances.

REF: Reference Dimension, usually without tolerance, for information purposes only.

Sheet 2 of 2 Microchip Technology Drawing C04-111-MS Rev F

## 8-Lead Plastic Micro Small Outline Package (MS) - 3x3 mm Body  [MSOP]

For the most current package drawings, please see the Microchip Packaging Specification located at http://www.microchip.com/packaging Note:

<!-- image -->

## RECOMMENDED LAND PATTERN

| Dimension Limits  Units  Contact Pitch  MILLIMETERS  0.65 BSC  MIN  E  MAX  Contact Pad Length (X8)  Contact Pad Width (X8)  Y  X  1.45  0.45  NOM  C  Contact Pad Spacing  4.40  Contact Pad to Contact Pad (X4)  G1  2.95  Contact Pad to Contact Pad (X6)  GX  0.20   |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

## Notes:

- Dimensioning and tolerancing per ASME Y14.5M 1.

BSC: Basic Dimension. Theoretically exact value shown without tolerances.

Microchip Technology Drawing C04-2111-MS Rev F

## 8-Lead Plastic Dual In-Line (P) - 300 mil Body [PDIP]

For the most current package drawings, please see the Microchip Packaging Specification located at http://www.microchip.com/packaging Note:

<!-- image -->

Microchip Technology Drawing No. C04-018-P Rev G Sheet 1 of 2

## 8-Lead Plastic Dual In-Line (P) - 300 mil Body [PDIP]

For the most current package drawings, please see the Microchip Packaging Specification located at http://www.microchip.com/packaging Note:

<!-- image -->

| Units  INCHES  Dimension Limits  MIN  NOM  MAX  Number of Pins  N  8  Pitch  e  .100 BSC  Top to Seating Plane  A  -  -  .210  Molded Package Thickness  A2  .115  .130  .195  Base to Seating Plane  A1  .015  Shoulder to Shoulder Width  E  .290  .310  .325  Molded Package Width  E1  .240  .250  .280  Overall Length  D  .348  .365  .400  Tip to Seating Plane  L  .115  .130  .150  Lead Thickness  c  .008  .010  .015  Upper Lead Width  b1  .040  .060  .070  Lower Lead Width  b  .014  .018  .022  Overall Row Spacing  eB  -  -  .430  §  -  -   |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

## Notes:

1. Pin 1 visual index feature may vary, but must be located within the hatched area.
2. § Significant Characteristic
3. protrusions shall not exceed .010" per side. Dimensions D and E1 do not include mold flash or protrusions.  Mold flash or
4. BSC: Basic Dimension. Theoretically exact value shown without tolerances. 4. Dimensioning and tolerancing per ASME Y14.5M
5. Lead design above seating plane may vary, based on assembly vendor.

Microchip Technology Drawing No. C04-018-P Rev G Sheet 2 of 2

## 8-Lead Plastic Small Outline (SN) - Narrow, 3.90 mm (.150 In.) Body [SOIC]

For the most current package drawings, please see the Microchip Packaging Specification located at http://www.microchip.com/packaging Note:

<!-- image -->

Microchip Technology Drawing No. C04-057-SN Rev K Sheet 1 of 2

## 8-Lead Plastic Small Outline (SN) - Narrow, 3.90 mm (.150 In.) Body [SOIC]

For the most current package drawings, please see the Microchip Packaging Specification located at http://www.microchip.com/packaging Note:

<!-- image -->

| Foot Angle  0°  -  8°  -  -  0°  Lead Angle  0.51  -  0.31  b  Lead Width  0.25  -  0.17  c  Lead Thickness  1.27  -  0.40  L  Foot Length  0.50  -  0.25  h  Chamfer (Optional)  4.90 BSC  D  Overall Length  3.90 BSC  E1  Molded Package Width  6.00 BSC  E  Overall Width  0.25  -  0.10  A1  Standoff  -  -  1.25  A2  Molded Package Thickness  1.75  -  -  A  Overall Height  1.27 BSC  e  Pitch  8  N  Number of Pins  MAX  NOM  MIN  Dimension Limits  MILLIMETERS  Units  §  Footprint  L1  1.04 REF  Mold Draft Angle  5°  -  15°  ș  ș  1  ș  2  -  -  0.07  R1  Lead Bend Radius  -  -  0.07  R  Lead Bend Radius   |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

## Notes:

1. Pin 1 visual index feature may vary, but must be located within the hatched area.
2. § Significant Characteristic
3. protrusions shall not exceed 0.15mm per side. 3. Dimensions D and E1 do not include mold flash or protrusions.  Mold flash or
4. Dimensioning and tolerancing per ASME Y14.5M
5. BSC: Basic Dimension. Theoretically exact value shown without tolerances.
6. REF: Reference Dimension, usually without tolerance, for information purposes only.
5. Datums A &amp; B to be determined at Datum H.

Microchip Technology Drawing No. C04-057-SN Rev K Sheet 2 of 2

## 8-Lead Plastic Small Outline (SN) - Narrow, 3.90 mm (.150 In.) Body [SOIC]

For the most current package drawings, please see the Microchip Packaging Specification located at http://www.microchip.com/packaging Note:

<!-- image -->

## RECOMMENDED LAND PATTERN

| Dimension Limits  Units  C  Contact Pad Spacing  Contact Pitch  MILLIMETERS  1.27 BSC  MIN  E  MAX  5.40  Contact Pad Length (X8)  Contact Pad Width (X8)  Y1  X1  1.55  0.60  NOM   |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

## Notes:

- Dimensioning and tolerancing per ASME Y14.5M 1.

BSC: Basic Dimension. Theoretically exact value shown without tolerances.

Microchip Technology Drawing C04-2057-SN Rev K

## 8-Lead Plastic Small Outline (SM) - Medium, 5.28 mm (.208 Inch) Body  [SOIJ]

Note: http://www.microchip.com/packaging For the most current package drawings, please see the Microchip Packaging Specification located at

<!-- image -->

Sheet 1 of 2 Microchip Technology Drawing C04-056 Rev E

## 8-Lead Plastic Small Outline (SM) - Medium, 5.28 mm (.208 Inch) Body  [SOIJ]

For the most current package drawings, please see the Microchip Packaging Specification located at http://www.microchip.com/packaging Note:

<!-- image -->

| Number of Terminals  Overall Height  Terminal Width  Overall Width  Terminal Length  Molded Package Width  Molded Package Thickness  Pitch  Standoff   §  Units  Dimension Limits  A1  A  b  E1  A2  e  L  E  N  1.27 BSC  -  0.51  0.36  1.77  0.05  -  -  -  -  MILLIMETERS  MIN  NOM  8  0.76  0.51  2.03  0.25  MAX  Overall Length  D  5.26 BSC  Terminal Thickness  c  0.15  -  0.25  ș  1  -  0°  8°  Foot Angle  ș  2  -  Lead Angle  1.75  1.98  ș  3  -  Mold Draft Angle  7.94 BSC  5.25 BSC  -  15°  0°  -   |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

## Notes:

1. Pin 1 visual index feature may vary, but must be located within the hatched area.
2. SOIJ - JEITA/EIAJ Standard, Formerly called SOIC
3. § - Significant Characteristic 3.
4. Dimensions D and E1 do not include mold flash or protrusions.  Mold flash or 4.

protrusions shall not exceed 0.25mm per side.

- Dimensioning and tolerancing per ASME Y14.5M 5.

BSC: Basic Dimension. Theoretically exact value shown without tolerances.

REF: Reference Dimension, usually without tolerance, for information purposes only.

Sheet 2 of 2 Microchip Technology Drawing C04-056 Rev E

## 8-Lead Plastic Small Outline (SM) - Medium, 5.28 mm (.208 Inch) Body  [SOIJ]

For the most current package drawings, please see the Microchip Packaging Specification located at http://www.microchip.com/packaging Note:

<!-- image -->

## RECOMMENDED LAND PATTERN

| Dimension Limits  Units  Contact Pitch  MILLIMETERS  1.27 BSC  MIN  E  MAX  Contact Pad Length (X8)  Contact Pad Width (X8)  Y  X  1.70  0.65  NOM  Z  Overall Width  9.00  Contact Pad to Contact Pad (X6)  G2  0.62  Contact Pad to Contact Pad (X4)  G1  5.60  C  Contact Pad Spacing  7.30   |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

## Notes:

- Dimensioning and tolerancing per ASME Y14.5M 1.

BSC: Basic Dimension. Theoretically exact value shown without tolerances.

Microchip Technology Drawing C04-2056 Rev E

## 8-Lead Plastic Dual Flat, No Lead Package (MN) - 2x3x0.8 mm Body [TDFN] With 1.4x1.3 mm Exposed Pad (JEDEC Package type WDFN)

For the most current package drawings, please see the Microchip Packaging Specification located at http://www.microchip.com/packaging Note:

<!-- image -->

Microchip Technology Drawing No. C04-129-MN Rev E Sheet 1 of 2

## 24AA128/24LC128/24FC128

## 8-Lead Plastic Dual Flat, No Lead Package (MN) - 2x3x0.8 mm Body [TDFN] With 1.4x1.3 mm Exposed Pad (JEDEC Package type WDFN)

For the most current package drawings, please see the Microchip Packaging Specification located at http://www.microchip.com/packaging Note:

<!-- image -->

| NOM  MILLIMETERS  0.50 BSC  2.00 BSC  3.00 BSC  0.20 REF  Contact-to-Exposed Pad  Contact Thickness  Exposed Pad Width  Exposed Pad Length  Contact Width  Overall Width  Overall Length  Contact Length  Standoff  Number of Pins  Overall Height  Pitch  K  0.20  Units  N  e  A  Dimension Limits  D  A3  A1  b  D2  E2  E  L  0.20  1.35  1.25  0.25  0.00  0.70  MIN  -  -  0.25  0.30  1.30  1.40  1.35  0.30  0.45  1.45  8  0.75  0.02  0.05  0.80  MAX   |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

## Notes:

1. Pin 1 visual index feature may vary, but must be located within the hatched area.
2. Package may have one or more exposed tie bars at ends.
3. Package is saw singulated
4. Dimensioning and tolerancing per ASME Y14.5M

BSC: Basic Dimension. Theoretically exact value shown without tolerances.

REF: Reference Dimension, usually without tolerance, for information purposes only.

Microchip Technology Drawing No. C04-129-MN Rev E Sheet 2 of 2

## 8-Lead Plastic Dual Flat, No Lead Package (MN) - 2x3x0.8 mm Body [TDFN] With 1.4x1.3 mm Exposed Pad (JEDEC Package type WDFN)

For the most current package drawings, please see the Microchip Packaging Specification located at http://www.microchip.com/packaging Note:

<!-- image -->

## RECOMMENDED LAND PATTERN

| Dimension Limits  Units  Optional Center Pad Width  Optional Center Pad Length  Contact Pitch  Y2  X2  1.50  1.60  MILLIMETERS  0.50 BSC  MIN  E  MAX  Contact Pad Length (X8)  Contact Pad Width (X8)  Y1  X1  0.85  0.25  NOM  C  Contact Pad Spacing  2.90  Thermal Via Diameter  V  Thermal Via Pitch  EV  0.30  1.00   |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

## Notes:

- Dimensioning and tolerancing per ASME Y14.5M 1.
- BSC: Basic Dimension. Theoretically exact value shown without tolerances.
- For best soldering results, thermal vias, if used, should be filled or tented to avoid solder loss during reflow process 2.

Microchip Technology Drawing No. C04-129-MN Rev. B

## /HDG 3ODVWLF 7KLQ 6KULQN 6PDOO 2XWOLQH  67        PP %RG\ &gt;76623@

)RU WKH PRVW FXUUHQW SDFNDJH GUDZLQJV  SOHDVH VHH WKH 0LFURFKLS 3DFNDJLQJ 6SHFLILFDWLRQ ORFDWHG DW KWWS   ZZZ PLFURFKLS FRP SDFNDJLQJ 1RWH

<!-- image -->

<!-- image -->

0LFURFKLS 7HFKQRORJ\ 'UDZLQJ  &amp;       5HY &amp; 6KHHW   RI

## /HDG 3ODVWLF 7KLQ 6KULQN 6PDOO 2XWOLQH  67        PP %RG\ &gt;76623@

)RU WKH PRVW FXUUHQW SDFNDJH GUDZLQJV  SOHDVH VHH WKH 0LFURFKLS 3DFNDJLQJ 6SHFLILFDWLRQ ORFDWHG DW KWWS   ZZZ PLFURFKLS FRP SDFNDJLQJ 1RWH

<!-- image -->

| E  /HDG :LGWK        )RRW $QJOH  F  /HDG 7KLFNQHVV  /  )RRW /HQJWK  '  2YHUDOO /HQJWK  (  0ROGHG 3DFNDJH :LGWK  %6&amp;  (  2YHUDOO :LGWK  $  6WDQGRII  $  0ROGHG 3DFNDJH 7KLFNQHVV  $  2YHUDOO +HLJKW  %6&amp;  H  3LWFK  1  1XPEHU RI 3LQV  0$;  120  0,1  'LPHQVLRQ /LPLWV  0,//,0(7(56  8QLWV  )RRWSULQW  /  5()   |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

## Notes:

- 3LQ   YLVXDO LQGH[ IHDWXUH PD\ YDU\  EXW PXVW EH ORFDWHG ZLWKLQ WKH KDWFKHG DUHD
- 'LPHQVLRQV ' DQG (  GR QRW LQFOXGH PROG IODVK RU SURWUXVLRQV  0ROG IODVK RU SURWUXVLRQV VKDOO QRW H[FHHG     PP SHU VLGH
- 'LPHQVLRQLQJ DQG WROHUDQFLQJ SHU $60( &lt;    0

%6&amp;  %DVLF 'LPHQVLRQ  7KHRUHWLFDOO\ H[DFW YDOXH VKRZQ ZLWKRXW WROHUDQFHV

5()  5HIHUHQFH 'LPHQVLRQ  XVXDOO\ ZLWKRXW WROHUDQFH  IRU LQIRUPDWLRQ SXUSRVHV RQO\

0LFURFKLS 7HFKQRORJ\ 'UDZLQJ  &amp;       5HY &amp; 6KHHW   RI

## /HDG 3ODVWLF 7KLQ 6KULQN 6PDOO 2XWOLQH  67        PP %RG\ &gt;76623@

)RU WKH PRVW FXUUHQW SDFNDJH GUDZLQJV  SOHDVH VHH WKH 0LFURFKLS 3DFNDJLQJ 6SHFLILFDWLRQ ORFDWHG DW KWWS   ZZZ PLFURFKLS FRP SDFNDJLQJ 1RWH

<!-- image -->

## 5(&amp;200(1'(' /$1' 3$77(51

| 'LPHQVLRQ /LPLWV  8QLWV  &amp;RQWDFW 3LWFK  0,//,0(7(56  %6&amp;  0,1  (  0$;  &amp;RQWDFW 3DG /HQJWK  ;  &amp;RQWDFW 3DG :LGWK  ;  &lt;  ;  120  &amp;  &amp;RQWDFW 3DG 6SDFLQJ  &amp;RQWDFW 3DG WR &amp;HQWHU 3DG  ;  *   |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

## 1RWHV

- 'LPHQVLRQLQJ DQG WROHUDQFLQJ SHU $60( &lt;    0
- %6&amp;  %DVLF 'LPHQVLRQ  7KHRUHWLFDOO\ H[DFW YDOXH VKRZQ ZLWKRXW WROHUDQFHV
- )RU EHVW VROGHULQJ UHVXOWV  WKHUPDO YLDV  LI XVHG  VKRXOG EH ILOOHG RU WHQWHG WR DYRLG VROGHU ORVV GXULQJ UHIORZ SURFHVV

0LFURFKLS 7HFKQRORJ\ 'UDZLQJ &amp;        5HY %

## APPENDIX A: REVISION HISTORY

## Revision V (02/2025)

Added E-temp offerings to the AA and FC devices.

## Revision U (11/2021)

Replaced terminology 'Master' and 'Slave' with 'Host' and  'Client'  respectively; Added Automotive  Product Identification System; Removed CSP product offering; Updated  DFN,  PDIP,  SOIC  and  TSSOP  package drawings.

## Revision T (08/2019)

Updated  Packaging;  Updated  content  throughout  for clarification.

## Revision S (05/2010)

Added  TDFN  Package;  Updated  Package  Drawings and Product ID.

## Revision R (04/2009)

Updated Chip Scale package.

## Revision Q (6/2008)

Updated packaging; Added Chip Scale package.

## Revision P

Changed 1.8V to 1.7V throughout document; Revised Features Section; Replaced Package Drawings; Revised Product ID Section.

## Revision N

Revised Sections 2.1, 2.4 and 6.3. Removed 14-Lead TSSOP Package.

## Revision M

Added 1.8V 400 kHz option for 24FC128.

## Revision L

Corrections to Section 1.0, Electrical Characteristics.

## 24AA128/24LC128/24FC128

## PRODUCT IDENTIFICATION SYSTEM (NON-AUTOMOTIVE)

To order or obtain information, e.g., on pricing or delivery, refer to the factory or the listed sales office.

## PART NO. Device

<!-- image -->

/XX Package

<!-- image -->

Tape and Reel Option

Device:

24AA128    =

1.7V, 128-Kbit I 2 C Serial EEPROM

24LC128    =

2.5V, 128-Kbit I 2 C Serial EEPROM

24FC128    =

1.7V, High-Speed, 128-Kbit I 2 C Serial EEPROM

Tape and Reel

Option:

Blank =

Standard packaging (tube or tray)

T =

Tape and Reel ( 1 )

Temperature Range:

I =

-40°C to +85°C   (Industrial)

E =

-40°C to +125°C (Extended)

Package:

MF

- = Plastic Dual Flat, No Lead Package 5x6x0.85 mm Body, 8-Lead (DFN-S)

MS

- = Plastic Micro Small Outline Package, 8-Lead (MSOP)

P

- = Plastic Dual In-Line - 300 mil Body, 8-Lead (PDIP)

SN

- = Plastic Small Outline - Narrow, 3.90 mm Body, 8-Lead (SOIC)

SM

- = Plastic Small Outline - Medium, 5.28 mm Body, 8-Lead (SOIJ)

MNY

- = Plastic Dual Flat, No Lead Package 2x3x0.8 mm Body, 8-Lead (TDFN)

ST

- = Plastic Thin Shrink Small Outline, 4.4 mm, 8-Lead (TSSOP)

## Examples:

- a) 24AA128-I/P: Industrial Temperature, 1.7V, PDIP package.
- b) 24AA128T-I/SN: Tape and Reel, Industrial Temperature, 1.7V, SOIC package.
- c) 24AA128-I/ST: Industrial Temperature, 1.7V, TSSOP package.
- d) 24AA128-I/MS: Industrial Temperature, 1.7V, MSOP package.
- e) 24LC128-E/P: Extended Temperature, 2.5V, PDIP package.
- f) 24LC128-I/SN: Industrial Temperature, 2.5V, SOIC package.
- g) 24LC128T-I/SN: Tape and Reel, Industrial Temperature, 2.5V, SOIC package.
- h) 24LC128-I/MS: Industrial Temperature, 2.5V, MSOP package.
- i) 24LC128T-I/MNY: Tape and Reel, Industrial Temp., 2.5V, TDFN package.
- j) 24FC128-I/P: Industrial Temperature, 1.7V, High Speed, PDIP package.
- k) 24FC128-I/SN: Industrial Temperature, 1.7V, High Speed, SOIC package.
- l) 24FC128T-E/SN: Tape and Reel, Extended Temperature, 1.7V, High Speed, SOIC package

Note 1: Tape and Reel identifier only appears

in the catalog part number description. This identifier is used for ordering purposes and is not printed on the device package. Check with your Microchip Sales Office for package availability with the Tape and Reel option.

## PRODUCT IDENTIFICATION SYSTEM (AUTOMOTIVE)

To order or obtain information, e.g., on pricing or delivery, refer to the factory or the listed sales office.

| PART NO.  X  /XX  Package  Temperature  Range  Device  Device:  24AA128       =   1.7V, 128-Kbit I 2 C Serial EEPROM  24LC128       =   2.5V, 128-Kbit I 2 C Serial EEPROM  Tape and Reel  Option:  Blank  =   Standard packaging (tube or tray)  T  =   Tape and Reel  (1)  Temperature  Range:  I  =   -40    C to +85    C   (AEC-Q100 Grade 3)  E  =   -40    C to +125    C (AEC-Q100 Grade 1)  Package:  MS  =     Plastic Micro Small Outline Package,  8-Lead (MSOP)  SN  =    Plastic Small Outline - Narrow,  3.90 mm Body, 8-Lead (SOIC)  ST                 =    Plastic Thin Shrink Small Outline,  4.4 mm, 8-Lead (TSSOP)  MNY              =    Plastic Dual Flat, No Lead Package  2x3x0.8 mm Body, 8-Lead (TDFN)  (Tape and Reel only)  Variant (2,3)  :  15KVAO  =   Standard Automotive, 15K Process  (4)  15KVXX  =   Customer-Specific Automotive, 15K  Process  (4)  16KVAO  =   Standard Automotive, 16K Process  16KVXX  =   Customer-Specific Automotive, 16K  Process  ## Examples:  - a) 24AA128T-E/MS16KVAO :  Tape and Reel, Automotive Grade 1, 1.7V, MSOP Package.  - b) 24AA128T-E/ST16KVAO : Tape and Reel, Automotive Grade 1, 1.7V, TSSOP Package.  - c) 24LC128T-I/SN16KVAO :  Tape and Reel, Automotive Grade 3, 2.5V, SOIC Package.  - d) 24LC128T-E/SN16KVAO : Tape and Reel, Automotive Grade 1, 2.5V, SOIC Package.  - e)  24LC128T-E/MN16KVAO : Tape and Reel, Automotive Grade 1, 1.7V, TDFN Package.  - Note 1: Tape and Reel identifier only appears in the catalog part number description. This identifier is used for ordering purposes and is not printed on the device package. Check with your Microchip Sales Office for package availability with the Tape and Reel option.  - 2: The VAO/VXX automotive variants have been designed, manufactured, tested and qualified in accordance with AEC-Q100 requirements for automotive applications.  - 3: For customers requesting a PPAP, a customer-specific part number will be generated and provided. A PPAP is not provided for VAO part numbers.  - 4: Not recommended for new designs.  [X]  Tape and Reel  Option  XXX  Variant  (1)  (2, 3)   |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

## 24AA128/24LC128/24FC128

## Microchip Information

## Trademarks

The 'Microchip' name and logo, the 'M' logo, and other names, logos, and brands are registered and unregistered trademarks of Microchip Technology Incorporated or its affiliates and/or subsidiaries in the United States and/or other countries ('Microchip Trademarks'). Information regarding Microchip Trademarks can be found at

https://www.microchip.com/en-us/about/legal-information/microchip-trademarks.

ISBN: 979-8-3371-0681-6

## Legal Notice

This publication and the information herein may be used only with Microchip products, including to design, test, and integrate Microchip products with your application. Use of this information in any other manner violates these terms. Information regarding device applications is provided only for your convenience and may be superseded by updates. It is your responsibility to ensure that your application meets with your specifications. Contact your local Microchip sales office for additional support or, obtain additional support at www.microchip.com/en-us/support/design-help/client-support-services.

THIS INFORMATION IS PROVIDED BY MICROCHIP "AS IS". MICROCHIP MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND WHETHER EXPRESS OR IMPLIED, WRITTEN OR ORAL, STATUTORY OR OTHERWISE, RELATED TO THE INFORMATION INCLUDING BUT NOT LIMITED TO ANY IMPLIED WARRANTIES OF NON-INFRINGEMENT, MERCHANTABILITY, AND FITNESS FOR A PARTICULAR PURPOSE, OR WARRANTIES RELATED TO ITS CONDITION, QUALITY, OR PERFORMANCE.

IN NO EVENT WILL MICROCHIP BE LIABLE FOR ANY INDIRECT, SPECIAL, PUNITIVE, INCIDENTAL, OR CONSEQUENTIAL LOSS, DAMAGE, COST, OR EXPENSE OF ANY KIND WHATSOEVER RELATED TO THE INFORMATION OR ITS USE, HOWEVER CAUSED, EVEN IF MICROCHIP HAS BEEN ADVISED OF THE POSSIBILITY OR THE DAMAGES ARE FORESEEABLE. TO THE FULLEST EXTENT ALLOWED BY LAW, MICROCHIP'S TOTAL LIABILITY ON ALL CLAIMS IN ANY WAY RELATED TO THE INFORMATION OR ITS USE WILL NOT EXCEED THE AMOUNT OF FEES, IF ANY, THAT YOU HAVE PAID DIRECTLY TO MICROCHIP FOR THE INFORMATION.

Use of Microchip devices in life support and/or safety applications is entirely at the buyer's risk, and the buyer agrees to defend, indemnify and hold harmless Microchip from any and all damages, claims, suits, or expenses resulting from such use. No licenses are conveyed, implicitly or otherwise, under any Microchip intellectual property rights unless otherwise stated.

## Microchip Devices Code Protection Feature

Note the following details of the code protection feature on Microchip products:

- Microchip products meet the specifications contained in their particular Microchip Data Sheet.
- Microchip believes that its family of products is secure when used in the intended manner, within operating specifications, and under normal conditions.
- Microchip values and aggressively protects its intellectual property rights. Attempts to breach the code protection features of Microchip product is strictly prohibited and may violate the Digital Millennium Copyright Act.
- Neither Microchip nor any other semiconductor manufacturer can guarantee the security of its code. Code protection does not mean that we are guaranteeing the product is 'unbreakable'. Code protection is constantly evolving. Microchip is committed to continuously improving the code protection features of our products.