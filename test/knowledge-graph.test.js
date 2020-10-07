const { diffbot, expect } = require('./global');

describe('Knowledge Graph Tests', function() {

  it('should generate the knowledge graph GET request', async () => {
    const query = 'type:LocalBusiness location.{country.name:"Canada" city.name:"Ottawa" isCurrent:true}';
    const type = 'query';
    const size = 100;
    const from = 1;
    const nonCanonicalFacts = false;

    let request = await diffbot.knowledgeGraph({ query, type, size, from, nonCanonicalFacts });

    expect(request.url).to.equal(`https://kg.diffbot.com/kg/dql_endpoint?token=${process.env.DIFFBOT_API_TOKEN}&query=${encodeURIComponent(query)}&type=${type}&size=${size}&from=${from}&nonCanonicalFacts=${+nonCanonicalFacts}`);
    expect(request.method).to.equal('GET');
    expect(request.body).to.be.undefined;
    expect(request.headers).to.be.an('object').that.is.empty;

    return Promise.resolve(true);
  });
});
