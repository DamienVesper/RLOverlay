export abstract class Packet<ClientPacket> {
    abstract deserialize: (raw: ClientPacket) => void;
}
