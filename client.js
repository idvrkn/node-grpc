const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
    './helloworld.proto',
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function main() {
    const client = new hello_proto.Greeter('localhost:50051',
        grpc.credentials.createInsecure());
    const user = 'world';

    for (let i = 0; i < 100; i++) {
        client.sayHello({name: `${user} ${i}`}, (err, response) => {
            console.log(response.message);
        });
    }
}

main();