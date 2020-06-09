import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | products', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /products', async function(assert) {
    await visit('/products');

    assert.equal(currentURL(), '/products');
  });
});
