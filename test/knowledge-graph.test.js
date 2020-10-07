const { diffbot, expect } = require('./global');

describe('Knowledge Graph Tests', function() {

  it('should generate the knowledge graph GET request', async () => {
    const query = 'type:LocalBusiness location.{country.name:"Canada" city.name:"Ottawa" isCurrent:true}';

    let request = await diffbot.knowledgeGraph({ query });

    expect(request.url).to.equal(`https://kg.diffbot.com/kg/dql_endpoint?token=${process.env.DIFFBOT_API_TOKEN}&query=${encodeURIComponent(query)}`);
    expect(request.method).to.equal('GET');
    expect(request.body).to.be.undefined;
    expect(request.headers).to.be.an('object').that.is.empty;

    return Promise.resolve(true);
  });
});
