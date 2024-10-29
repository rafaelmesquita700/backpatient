const { model, Schema } = require("mongoose")

const patientSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    address: { type: String },
    cpf: { type: Number },
    phone: { type: Number },
    reason: { type: String }
  },
  {
    timestamps: true
  }
)

module.exports = model("Patient", patientSchema)
