const router = require('express').Router();
const { restart } = require('nodemon');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  try{
    const catergoryData = await Category.findAll({ 
      include: [{model: Product}] 
  });
  res.status(200).json(catergoryData);
} catch(err){
  res.status(500).json(err)
}
});
  // be sure to include its associated Products

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
  const categoryData = await Category.findByPk(req.params.id, {
    include: [{model: Product}]
  });
  res.status(200).json(categoryData);
} catch(err){
  res.status(500).json(err)
}
});

router.post('/', (req, res) => {
  // create a new category
  try{
    const categoryData = await Category.create({product_id: req.body.reader_id,
    });
    res.status(200).json(categoryData);
  } catch(err){
    res.status(500).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body,{
      where:{
        id: req.params.id,
      },
    })
    res.status(200).json(categoryData);
  } catch(err){
    res.status(500).json(err)
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try{
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(categoryData);
  } catch(err){
    res.status(500),json(err)
  }
});

module.exports = router;
