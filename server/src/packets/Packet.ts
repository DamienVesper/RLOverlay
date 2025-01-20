export abstract class Packet<SOSPacket, ClientPacket> {
    abstract serialize: (raw: SOSPacket) => ClientPacket;
    abstract deserialize: (raw: SOSPacket) => void;
}
