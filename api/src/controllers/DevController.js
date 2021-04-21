const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async store(req, res) {
    const { githubUsername, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ githubUsername });

    if (!dev) {
      const apiRes = await axios.get(
        `https://api.github.com/users/${githubUsername}`
      );

      const { bio } = apiRes.data;

      const name = apiRes.data.name || apiRes.data.login;
      const avatarUrl = apiRes.data.avatar_url;
      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      dev = await Dev.create({
        githubUsername,
        name,
        avatarUrl,
        bio,
        techs: techsArray,
        location,
      });

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );

      sendMessage(sendSocketMessageTo, 'add-dev', dev);
    }

    return res.json(dev);
  },

  async destroy(req, res) {
    const dev = await Dev.findByIdAndRemove(req.params._id);

    const sendSocketMessageTo = findConnections(
      {
        latitude: dev.location.coordinates[1],
        longitude: dev.location.coordinates[0],
      },
      dev.techs
    );

    sendMessage(sendSocketMessageTo, 'remove-dev', dev);

    return res.send(dev);
  },
};
