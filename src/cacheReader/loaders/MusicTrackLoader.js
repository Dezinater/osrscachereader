// Headers
const MTHD_MAGIC = 1297377380;
const MTRK_MAGIC = 1297379947;

// Major MIDI Messages. Bottom 4 bits are the channel.
const NOTE_ON = 0b1001_0000;
const NOTE_OFF = 0b1000_0000;
const CONTROL_CHANGE = 0b1011_0000;
const PITCH_WHEEL_CHANGE = 0b1110_0000;
const CHANNEL_PRESSURE = 0b1101_0000;
const POLYPHONIC_KEY_PRESSURE = 0b1010_0000;
const PROGRAM_CHANGE = 0b1100_0000;

// Meta Events
const META = 255;
const END_OF_TRACK = 47;
const TEMPO = 81;

// Controller messages
const CONTROLLER_BANK_SELECT = 0;
const CONTROLLER_MODULATION_WHEEL = 1;
const CONTROLLER_CHANNEL_VOLUME = 7;
const CONTROLLER_PAN = 10;
const CONTROLLER_BANK_SELECT_2 = 32;
const CONTROLLER_MODULATION_WHEEL2 = 33;
const CONTROLLER_CHANNEL_VOLUME_2 = 39;
const CONTROLLER_PAN_2 = 42;
const CONTROLLER_DAMPER_PEDAL = 64;
const CONTROLLER_PORTAMENTO = 65;
const CONTROLLER_NON_REGISTERED_PARAMETER_NUMBER_LSB = 98;
const CONTROLLER_NON_REGISTERED_PARAMETER_NUMBER_MSB = 99;
const CONTROLLER_REGISTERED_PARAMETER_NUMBER_LSB = 100;
const CONTROLLER_REGISTERED_PARAMETER_NUMBER_MSB = 101;
const CONTROLLER_ALL_SOUND_OFF = 120;
const CONTROLLER_RESET_ALL_CONTROLLERS = 121;
const CONTROLLER_ALL_NOTES_OFF = 123;

const JAG_NOTE_ON = 0;
const JAG_NOTE_OFF = 1;
const JAG_CONTROL_CHANGE = 2;
const JAG_PITCH_BEND = 3;
const JAG_CHANNEL_PRESSURE = 4;
const JAG_POLY_PRESSURE = 5;
const JAG_PROGRAM_CHANGE = 6;
const JAG_END_OF_TRACK = 7;
const JAG_TEMPO = 23;
/**
 * Jingles and Tracks
 * @class MusicTrackDefinition
 * @category Definitions
 * @hideconstructor
 */
export class MusicTrackDefinition {
    /**
     * The ID of this Music Track
     * @type {number}
     */
    id;
    midi;
}
export default class MusicTrackLoader {
    load(bytes, id) {
        let def = new MusicTrackDefinition();
        def.id = id;
        let dataview = new DataView(bytes.buffer);

        dataview.setPosition(dataview.byteLength - 3);
        let tracks = dataview.readUint8();
        let division = dataview.readUint16();
        let offset = 14 + tracks * 10;
        dataview.setPosition(0);
        let tempoOpcodes = 0;
        let ctrlChangeOpcodes = 0;
        let noteOnOpcodes = 0;
        let noteOffOpcodes = 0;
        let wheelChangeOpcodes = 0;
        let chnnlAfterTchOpcodes = 0;
        let keyAfterTchOpcodes = 0;
        let progmChangeOpcodes = 0;

        let var13;
        let opcode;
        let controlChangeIndex;
        let var51;
        try {
            for (var13 = 0; var13 < tracks; ++var13) {
                opcode = -1;

                while (true) {
                    controlChangeIndex = dataview.readUint8();
                    if (controlChangeIndex != opcode) {
                        ++offset;
                    }

                    opcode = controlChangeIndex & 15;
                    if (controlChangeIndex == JAG_END_OF_TRACK) {
                        break;
                    }

                    if (controlChangeIndex == JAG_TEMPO) {
                        ++tempoOpcodes;
                    } else if (opcode == JAG_NOTE_ON) {
                        ++noteOnOpcodes;
                    } else if (opcode == JAG_NOTE_OFF) {
                        ++noteOffOpcodes;
                    } else if (opcode == JAG_CONTROL_CHANGE) {
                        ++ctrlChangeOpcodes;
                    } else if (opcode == JAG_PITCH_BEND) {
                        ++wheelChangeOpcodes;
                    } else if (opcode == JAG_CHANNEL_PRESSURE) {
                        ++chnnlAfterTchOpcodes;
                    } else if (opcode == JAG_POLY_PRESSURE) {
                        ++keyAfterTchOpcodes;
                    } else if (opcode == JAG_PROGRAM_CHANGE) {
                        ++progmChangeOpcodes;
                    } else {
                        throw new RuntimeException();
                    }
                }
            }

            offset += 5 * tempoOpcodes;
            offset +=
                2 * (noteOnOpcodes + noteOffOpcodes + ctrlChangeOpcodes + wheelChangeOpcodes + keyAfterTchOpcodes);
            offset += chnnlAfterTchOpcodes + progmChangeOpcodes;
            var13 = dataview.getPosition();
            opcode =
                tracks +
                tempoOpcodes +
                ctrlChangeOpcodes +
                noteOnOpcodes +
                noteOffOpcodes +
                wheelChangeOpcodes +
                chnnlAfterTchOpcodes +
                keyAfterTchOpcodes +
                progmChangeOpcodes;

            for (controlChangeIndex = 0; controlChangeIndex < opcode; ++controlChangeIndex) {
                dataview.readVarInt();
            }

            offset += dataview.getPosition() - var13;
            controlChangeIndex = dataview.getPosition();
            let modulationWheelSize = 0;
            let modulationWheel2Size = 0;
            let channelVolumeSize = 0;
            let channelVolume2Size = 0;
            let panSize = 0;
            let pan2Size = 0;
            let nonRegisteredMsbSize = 0;
            let nonRegisteredLsbSize = 0;
            let registeredNumberMsb = 0;
            let registeredLsbSize = 0;
            let commandsSize = 0;
            let otherSize = 0;
            let controllerNumber = 0;

            let var29;
            for (var29 = 0; var29 < ctrlChangeOpcodes; ++var29) {
                controllerNumber = (controllerNumber + dataview.readUint8()) & 127;
                if (controllerNumber == CONTROLLER_BANK_SELECT || controllerNumber == CONTROLLER_BANK_SELECT_2) {
                    ++progmChangeOpcodes;
                } else if (controllerNumber == CONTROLLER_MODULATION_WHEEL) {
                    ++modulationWheelSize;
                } else if (controllerNumber == CONTROLLER_MODULATION_WHEEL2) {
                    ++modulationWheel2Size;
                } else if (controllerNumber == CONTROLLER_CHANNEL_VOLUME) {
                    ++channelVolumeSize;
                } else if (controllerNumber == CONTROLLER_CHANNEL_VOLUME_2) {
                    ++channelVolume2Size;
                } else if (controllerNumber == CONTROLLER_PAN) {
                    ++panSize;
                } else if (controllerNumber == CONTROLLER_PAN_2) {
                    ++pan2Size;
                } else if (controllerNumber == CONTROLLER_NON_REGISTERED_PARAMETER_NUMBER_MSB) {
                    ++nonRegisteredMsbSize;
                } else if (controllerNumber == CONTROLLER_NON_REGISTERED_PARAMETER_NUMBER_LSB) {
                    ++nonRegisteredLsbSize;
                } else if (controllerNumber == CONTROLLER_REGISTERED_PARAMETER_NUMBER_MSB) {
                    ++registeredNumberMsb;
                } else if (controllerNumber == CONTROLLER_REGISTERED_PARAMETER_NUMBER_LSB) {
                    ++registeredLsbSize;
                } else if (
                    controllerNumber != CONTROLLER_DAMPER_PEDAL &&
                    controllerNumber != CONTROLLER_PORTAMENTO &&
                    controllerNumber != CONTROLLER_ALL_SOUND_OFF &&
                    controllerNumber != CONTROLLER_RESET_ALL_CONTROLLERS &&
                    controllerNumber != CONTROLLER_ALL_NOTES_OFF
                ) {
                    ++otherSize;
                } else {
                    ++commandsSize;
                }
            }

            var29 = 0;
            let commandsIndex = dataview.getPosition();
            dataview.addPosition(commandsSize);
            let polyPressureIndex = dataview.getPosition();
            dataview.addPosition(keyAfterTchOpcodes);
            let channelPressureIndex = dataview.getPosition();
            dataview.addPosition(chnnlAfterTchOpcodes);
            let pitchWheelHighIndex = dataview.getPosition();
            dataview.addPosition(wheelChangeOpcodes);
            let modulationWheelOffset = dataview.getPosition();
            dataview.addPosition(modulationWheelSize);
            let channelVolumeOffset = dataview.getPosition();
            dataview.addPosition(channelVolumeSize);
            let panOffset = dataview.getPosition();
            dataview.addPosition(panSize);
            let notesIndex = dataview.getPosition();
            dataview.addPosition(noteOnOpcodes + noteOffOpcodes + keyAfterTchOpcodes);
            let notesOnIndex = dataview.getPosition();
            dataview.addPosition(noteOnOpcodes);
            let otherIndex = dataview.getPosition();
            dataview.addPosition(otherSize);
            let notesOffIndex = dataview.getPosition();
            dataview.addPosition(noteOffOpcodes);
            let modulationWheel2Offset = dataview.getPosition();
            dataview.addPosition(modulationWheel2Size);
            let channelVolume2Offset = dataview.getPosition();
            dataview.addPosition(channelVolume2Size);
            let pan2Offset = dataview.getPosition();
            dataview.addPosition(pan2Size);
            let programChangeIndex = dataview.getPosition();
            dataview.addPosition(progmChangeOpcodes);
            let pitchWheelLowIndex = dataview.getPosition();
            dataview.addPosition(wheelChangeOpcodes);
            let nonRegisteredMsbIndex = dataview.getPosition();
            dataview.addPosition(nonRegisteredMsbSize);
            let nonRegisteredLsbIndex = dataview.getPosition();
            dataview.addPosition(nonRegisteredLsbSize);
            let registeredMsbIndex = dataview.getPosition();
            dataview.addPosition(registeredNumberMsb);
            let registeredLsbIndex = dataview.getPosition();
            dataview.addPosition(registeredLsbSize);
            let tempoOffset = dataview.getPosition();
            dataview.addPosition(tempoOpcodes * 3);

            var51 = new DataView(new ArrayBuffer(offset + 1));
            var51.writeInt32(MTHD_MAGIC); // MThd header
            var51.writeInt32(6); // length of header
            var51.writeInt16(tracks > 1 ? 1 : 0); // format
            var51.writeInt16(tracks); // tracks
            var51.writeInt16(division); // division
            dataview.setPosition(var13);
            let channel = 0;
            let var53 = 0;
            let var54 = 0;
            let var55 = 0;
            let var56 = 0;
            let var57 = 0;
            let var58 = 0;
            let var59 = new Array(128).fill().map((x) => 0);
            controllerNumber = 0;

            label361: for (let var60 = 0; var60 < tracks; ++var60) {
                var51.writeInt32(MTRK_MAGIC); // MTrk
                var51.addPosition(4); // length gets written here later
                let var61 = var51.getPosition();
                let var62 = -1;

                while (true) {
                    let deltaTick = dataview.readVarInt();
                    var51.writeVarInt(deltaTick); // delta time
                    let status = dataview.getInt8(var29++) & 255;
                    let var65 = status != var62;
                    var62 = status & 15;
                    if (status == JAG_END_OF_TRACK) {
                        //if (var65)// -- client has this if, but it causes broken midi to be produced
                        {
                            var51.writeInt8(META);
                        }

                        var51.writeInt8(END_OF_TRACK); // type - end of track
                        var51.writeInt8(0); // length
                        var51.writeLengthFromMark(var51.getPosition() - var61);
                        //break; //?
                        continue label361;
                    }

                    if (status == JAG_TEMPO) {
                        //if (var65) //-- client has this if, but it causes broken midi to be produced
                        {
                            var51.writeInt8(META); // meta event FF
                        }

                        var51.writeInt8(TEMPO); // type - set tempo
                        var51.writeInt8(3); // length
                        var51.writeInt8(dataview.getInt8(tempoOffset++));
                        var51.writeInt8(dataview.getInt8(tempoOffset++));
                        var51.writeInt8(dataview.getInt8(tempoOffset++));
                    } else {
                        channel ^= status >> 4;
                        if (var62 == JAG_NOTE_ON) {
                            if (var65) {
                                var51.writeInt8(NOTE_ON + channel);
                            }

                            var53 += dataview.getInt8(notesIndex++);
                            var54 += dataview.getInt8(notesOnIndex++);
                            var51.writeInt8(var53 & 127);
                            var51.writeInt8(var54 & 127);
                        } else if (var62 == JAG_NOTE_OFF) {
                            if (var65) {
                                var51.writeInt8(NOTE_OFF + channel);
                            }

                            var53 += dataview.getInt8(notesIndex++);
                            var55 += dataview.getInt8(notesOffIndex++);
                            var51.writeInt8(var53 & 127);
                            var51.writeInt8(var55 & 127);
                        } else if (var62 == JAG_CONTROL_CHANGE) {
                            if (var65) {
                                var51.writeInt8(CONTROL_CHANGE + channel);
                            }

                            controllerNumber = (controllerNumber + dataview.getInt8(controlChangeIndex++)) & 127;
                            var51.writeInt8(controllerNumber);
                            let var66;
                            if (
                                controllerNumber == CONTROLLER_BANK_SELECT ||
                                controllerNumber == CONTROLLER_BANK_SELECT_2
                            ) {
                                var66 = dataview.getInt8(programChangeIndex++);
                            } else if (controllerNumber == CONTROLLER_MODULATION_WHEEL) {
                                var66 = dataview.getInt8(modulationWheelOffset++);
                            } else if (controllerNumber == CONTROLLER_MODULATION_WHEEL2) {
                                var66 = dataview.getInt8(modulationWheel2Offset++);
                            } else if (controllerNumber == CONTROLLER_CHANNEL_VOLUME) {
                                var66 = dataview.getInt8(channelVolumeOffset++);
                            } else if (controllerNumber == CONTROLLER_CHANNEL_VOLUME_2) {
                                var66 = dataview.getInt8(channelVolume2Offset++);
                            } else if (controllerNumber == CONTROLLER_PAN) {
                                var66 = dataview.getInt8(panOffset++);
                            } else if (controllerNumber == CONTROLLER_PAN_2) {
                                var66 = dataview.getInt8(pan2Offset++);
                            } else if (controllerNumber == CONTROLLER_NON_REGISTERED_PARAMETER_NUMBER_MSB) {
                                var66 = dataview.getInt8(nonRegisteredMsbIndex++);
                            } else if (controllerNumber == CONTROLLER_NON_REGISTERED_PARAMETER_NUMBER_LSB) {
                                var66 = dataview.getInt8(nonRegisteredLsbIndex++);
                            } else if (controllerNumber == CONTROLLER_REGISTERED_PARAMETER_NUMBER_MSB) {
                                var66 = dataview.getInt8(registeredMsbIndex++);
                            } else if (controllerNumber == CONTROLLER_REGISTERED_PARAMETER_NUMBER_LSB) {
                                var66 = dataview.getInt8(registeredLsbIndex++);
                            } else if (
                                controllerNumber != CONTROLLER_DAMPER_PEDAL &&
                                controllerNumber != CONTROLLER_PORTAMENTO &&
                                controllerNumber != CONTROLLER_ALL_SOUND_OFF &&
                                controllerNumber != CONTROLLER_RESET_ALL_CONTROLLERS &&
                                controllerNumber != CONTROLLER_ALL_NOTES_OFF
                            ) {
                                var66 = dataview.getInt8(otherIndex++);
                            } else {
                                var66 = dataview.getInt8(commandsIndex++);
                            }

                            let var67 = var66 + var59[controllerNumber];
                            var59[controllerNumber] = var67;
                            var51.writeInt8(var67 & 127);
                        } else if (var62 == JAG_PITCH_BEND) {
                            if (var65) {
                                var51.writeInt8(PITCH_WHEEL_CHANGE + channel);
                            }

                            var56 += dataview.getInt8(pitchWheelLowIndex++);
                            var56 += dataview.getInt8(pitchWheelHighIndex++) << 7;
                            var51.writeInt8(var56 & 127);
                            var51.writeInt8((var56 >> 7) & 127);
                        } else if (var62 == JAG_CHANNEL_PRESSURE) {
                            if (var65) {
                                var51.writeInt8(CHANNEL_PRESSURE + channel);
                            }

                            var57 += dataview.getInt8(channelPressureIndex++);
                            var51.writeInt8(var57 & 127);
                        } else if (var62 == JAG_POLY_PRESSURE) {
                            if (var65) {
                                var51.writeInt8(POLYPHONIC_KEY_PRESSURE + channel);
                            }

                            var53 += dataview.getInt8(notesIndex++);
                            var58 += dataview.getInt8(polyPressureIndex++);
                            var51.writeInt8(var53 & 127);
                            var51.writeInt8(var58 & 127);
                        } else if (var62 == JAG_PROGRAM_CHANGE) {
                            if (var65) {
                                var51.writeInt8(PROGRAM_CHANGE + channel);
                            }

                            var51.writeInt8(dataview.getInt8(programChangeIndex++));
                        } else {
                            throw new RuntimeException();
                        }
                    }
                }
            }
        } catch (e) {
            console.error(e);
        }
        //def.midi = var51.flip();
        def.midi = new Int8Array(var51.buffer);
        return def;
    }
}
