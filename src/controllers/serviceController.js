const { Service: ServiceModel } = require("../models/Service");
const mongoose = require("mongoose");

const serviceController = {
  create: async (req, res) => {
    try {
      const service = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
      };
      const response = await ServiceModel.create(service);

      res.status(201).json({ response, msg: "Serviço criado com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },

  getAll: async (req, res) => {
    try {
      const services = await ServiceModel.find();

      res.json(services);
    } catch (error) {
      console.log(error);
    }
  },

  get: async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "ID inválido!" });
      }

      const service = await ServiceModel.findById(id);

      if (!service) {
        return res.status(404).json({ msg: "Serviço não encontrado!" });
      }

      return res.json(service);
    } catch (error) {
      console.error("Erro no GET /services/:id:", error.message);
      return res.status(500).json({ msg: "Erro interno no servidor." });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const service = await ServiceModel.findById(id);

      if (!service) {
        return res.status(404).json({ msg: "Serviço não encontrado!" });
      }

      const deletedService = await ServiceModel.findByIdAndDelete(id);

      res.status(200).json({ msg: "Serviço deletado com sucesso" });
    } catch (error) {
      console.log(error);
    }
  },

  put: async (req, res) => {
    try {
      const id = req.params.id;
      const service = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
      };

      const updatedService = await ServiceModel.findByIdAndUpdate(id, service);

      if (!updatedService) {
        return res.status(404).json({ msg: "Serviço não encontrado!" });
      }

      return res
        .status(200)
        .json({ service, msg: "Serviço atualizado com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = serviceController;
