const { Service: ServiceModel } = require("../models/Service");

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
      const id = req.params.id;

      // VALIDAÇÃO: impede o erro antes que ele ocorra
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "ID inválido!" });
      }

      const service = await ServiceModel.findById(id);

      if (!service) {
        return res.status(404).json({ msg: "Serviço não encontrado!" });
      }

      res.json(service);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Erro interno no servidor." });
    }
  },
};

module.exports = serviceController;
