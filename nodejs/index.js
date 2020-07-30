const { CredentialsServiceClient: CredentialsServiceClient, Credentials } = require("@trinsic/service-clients");

const client = new CredentialsServiceClient(new Credentials("<access_token>"), { noRetryPolicy: true });

const listOrganizations = async () => {
    var result = await client.listTenants();
    result.forEach(org => console.log(org));
}

const createVerificationPolicy = async () => {
    var response = await client.createVerificationPolicy({
        name: "verification-name",
        version: "1.0",
        attributes: [ {
                policyName: "proof of valid id",
                attributeNames: [
                    "first name",
                    "last name",
                    "address"
                ]
            } ],
        predicates: [ {
                policyName: "must be over 21",
                attributeName: "age",
                predicateType: ">",
                predicateValue: 21,
                restrictions: [ {
                    schemaName: "government id"
                } ]
            } ]
    });
    var policy = await client.getVerificationPolicy(response.policyId);
    console.log(policy);
}

const createConnectionInvitation = async () => {
    var invitation = await client.createConnection({});
    console.log(invitation);
}

listOrganizations();

createVerificationPolicy();

createConnectionInvitation();
