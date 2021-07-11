const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll( {
    include: [
        {
        model: Product, 
        through: ProductTag, 
        },
      ],
    });
    //const tag = tagData.get({ plain: true });
    const tag = tagData.map(tag=> tag.get({ plain: true }));
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product, 
          through: ProductTag, 
         }
      ],
    });
      if (!tagData) {
      res.status(404).json({ message: 'No data found with this id!' });
      return;
    }
    const tag = tagData.get({ plain: true });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  
Tag.create(req.body)
    .then((tag) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      //if (req.body.tagIds.length) {
        if (req.body.tagIds) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: tag.id,
            tag_id, category_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
     //  if no product tags, just respond
      res.status(200).json(tag);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update a tag's name by its `id` value
//router.put('/:id', async (req, res) => {
  router.put('/:id', async(req, res) => {
    try {
    const tagData = await Tag.update(req.body, {

    //Tag.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      if (!tagData) {
        res.status(404).json({ message: 'No tag with this id!' });
        return;
      }
        res.status(200).json(tagData);
        } catch (err) {
          res.status(400).json(err);
        }
      });
      
        
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
