import mongoose from "mongoose";

interface IDeliveryAssignment {
          _id?: mongoose.Types.ObjectId,
          order:mongoose.Types.ObjectId,
          BroadcastedTo: mongoose.Types.ObjectId[],
            assignedTo: mongoose.Types.ObjectId | null,
            status: 'pending' | 'assigned' | 'in-transit' | 'delivered' | 'failed',
            acceptedAt: Date | null,
            createdAt?: Date,
            updatedAt?: Date
}
const deliveryAssignmentSchema = new mongoose.Schema<IDeliveryAssignment>({
    order: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'Order', 
    required: true },
    BroadcastedTo: [{ 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User' }],
    assignedTo: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' },
    status: { 
    type: String, 
    enum: ['pending', 'assigned', 'in-transit', 'delivered', 'failed'], 
    default: 'pending' },
    acceptedAt: { 
        type: Date },
}, { timestamps: true });

const DeliveryAssignment = mongoose.models.DeliveryAssignment || mongoose.model<IDeliveryAssignment>('DeliveryAssignment', deliveryAssignmentSchema);