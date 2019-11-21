const express = require('express');

const Schemes = require('./scheme-model.js');

const router = express.Router();

router.get('/', (req, res) => {
  Schemes.find()
    .then((schemes) => res.json(schemes))
    .catch(() => res.status(500).json({ message: 'Failed to get schemes' }));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Schemes.findById(id)
    .then((scheme) => {
      return (scheme)
        ? res.json(scheme)
        : res.status(404).json({ message: 'Could not find scheme with given id.' });
    })
    .catch(() => res.status(500).json({ message: 'Failed to get schemes' }));
});

router.get('/:id/steps', (req, res) => {
  const { id } = req.params;

  Schemes.findSteps(id)
    .then((steps) => {
      return (steps.length)
        ? res.json(steps)
        : res.status(404).json({ message: 'Could not find steps for given scheme' });
    })
    .catch(() => res.status(500).json({ message: 'Failed to get steps' }));
});

router.post('/', (req, res) => {
  const schemeData = req.body;

  Schemes.add(schemeData)
    .then((scheme) => res.status(201).json(scheme))
    .catch(() => res.status(500).json({ message: 'Failed to create new scheme' }));
});

router.post('/:id/steps', (req, res) => {
  const stepData = req.body;
  const { id } = req.params;

  Schemes.findById(id)
    .then((scheme) => {
      return (scheme)
        ? Schemes.addStep(stepData, id)
          .then((step) => res.status(201).json(step))
        : res.status(404).json({ message: 'Could not find scheme with given id.' });
    })
    .catch(() => res.status(500).json({ message: 'Failed to create new step' }));
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Schemes.findById(id)
    .then((scheme) => {
      return (scheme)
        ? Schemes.update(changes, id)
          .then((updatedScheme) => res.json(updatedScheme))
        : res.status(404).json({ message: 'Could not find scheme with given id' });
    })
    .catch(() => res.status(500).json({ message: 'Failed to update scheme' }));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Schemes.remove(id)
    .then((deleted) => {
      return (deleted)
        ? res.json({ removed: deleted })
        : res.status(404).json({ message: 'Could not find scheme with given id' });
    })
    .catch(() => res.status(500).json({ message: 'Failed to delete scheme' }));
});

module.exports = router;
