const { diffbot, expect, FAKE_TOKEN } = require('./global');

describe('Knowledge Graph Tests', function() {

  const query = 'type:LocalBusiness location.{country.name:"Canada" city.name:"Ottawa" isCurrent:true}';

  it('should generate the knowledge graph GET request', async () => {
    const type = 'query';
    const size = 100;
    const from = 1;
    const jsonmode = 'extended';
    const nonCanonicalFacts = false;
    const noDedupArticles = false;

    let request = await diffbot.knowledgeGraph({ query, type, size, from, jsonmode, nonCanonicalFacts, noDedupArticles });

    expect(request.url).to.equal(`https://kg.diffbot.com/kg/dql_endpoint?token=${FAKE_TOKEN}&query=${encodeURIComponent(query)}&type=${type}&size=${size}&from=${from}&jsonmode=${jsonmode}&nonCanonicalFacts=${+nonCanonicalFacts}&noDedupArticles=${+noDedupArticles}`);
    expect(request.method).to.equal('GET');
    expect(request.body).to.be.undefined;
    expect(request.headers).to.be.an('object').that.is.empty;

    return Promise.resolve(true);
  });

  it('should error on knowledge graph request with no query', async () => {

    expect(() => {
      return diffbot.knowledgeGraph({});
    }).to.throw('missing query');

    return Promise.resolve(true);
  });

  it('should error on knowledge graph request with invalid jsonmode', async () => {

    expect(() => {
      return diffbot.knowledgeGraph({ query, jsonmode: 'json' });
    }).to.throw('invalid jsonmode');

    return Promise.resolve(true);
  });
});
