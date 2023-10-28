import Transport from '../models/transport.model';
import { ErrorMessage } from '../error/message.error';

const getAll = async () => {
    try {
        const transports = Transport.find();
        return await transports;
    } catch (e) {
        return ErrorMessage(400, "Transport not found");
    }
}
const getTransportById = async (id) => {
    try {
        const transport = Transport.findById(id);
        return await transport;
    } catch (e) {
        return ErrorMessage(400, "Transport not found");
    }
}
export default { getAll, getTransportById }