const mongoose = require("mongoose");
const PartyModel = require("../models/Party");

const checkPartyBudget = (budget, services) => {
  const priceSum = services.reduce((sum, services) => sum + services.price, 0);

  if (priceSum > budget) {
    return false;
  }

  return true;
};

const partyController = {
  create: async (req, res) => {
    try {
      const party = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        budget: req.body.budget,
        price: req.body.price,
        image: req.body.image,
        services: req.body.services,
      };

      if (party.services && !checkPartyBudget(party.budget, party.services)) {
        res.status(406).json({ msg: "O seu orçamento é insuficiente" });
      }

      const response = await PartyModel.create(party);

      res.status(201).json({ response });
    } catch (error) {
      console.log(error);
    }
  },

  getAll: async (req, res) => {
    try {
      const parties = await PartyModel.find();
      res.json(parties);
    } catch (error) {
      console.log(error);
    }
  },

  get: async (req, res) => {
    try {
      const id = req.params.id;

      const party = await PartyModel.findById(id);

      if (!party) {
        res.status(404).json({ msg: "Festa não encontrada" });
        return;
      }

      res.json(party);
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "ID inválido" });
    }

    try {
      const deletedParty = await PartyModel.findByIdAndDelete(id);

      if (!deletedParty) {
        return res.status(404).json({ msg: "Festa não encontrada" });
      }

      return res.status(200).json({
        msg: "Festa excluída com sucesso!",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Erro no servidor" });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;

      const party = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        budget: req.body.budget,
        price: req.body.price,
        image: req.body.image,
        services: req.body.services,
      };

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "ID inválido" });
      }
      //verifica se os preços dos serviços são maiores que o orçamento
      if (party.services && !checkPartyBudget(party.budget, party.services)) {
        return res.status(406).json({ msg: "O seu orçamento é insuficiente" });
      }

      const updatedParty = await PartyModel.findByIdAndUpdate(id, party);

      if (!party) {
        res.status(404).json({ msg: "Festa não encontrada" });
        return;
      }

      res
        .status(200)
        .json({ party, msg: "Festa atualizada com sucesso!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Erro no servidor" });
    }
  },
};

module.exports = partyController;
