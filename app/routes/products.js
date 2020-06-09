import Route from '@ember/routing/route';

export default Route.extend({
  async model() {
    const response = await fetch('https://stormy-lowlands-15129.herokuapp.com/products')    
    const products = await response.json()

    return products;
  }
});
