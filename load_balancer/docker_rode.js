const Docker = require('dockerode');
const docker = new Docker();

const containerNamePrefix = "swiftcab-dev-api";
const imageName = "node:20"; // Change if needed
const ports = [6001, 6002, 6003, 6004, 6005];

async function startContainers() {
    for (const port of ports) {
        const containerName = `${containerNamePrefix}-${port}`;
        
        try {
            // Check if container exists
            let container = await docker.getContainer(containerName);
            let data = await container.inspect();

            if (data.State.Running) {
                console.log(`✅ Container ${containerName} is already running`);
                continue;
            }

            console.log(`🔄 Restarting ${containerName}...`);
            await container.start();
        } catch (err) {
            console.log(`🚀 Creating & starting container: ${containerName}`);

            await docker.createContainer({
                Image: imageName,
                name: containerName,
                ExposedPorts: { "3000/tcp": {} },
                HostConfig: {
                    PortBindings: { "3000/tcp": [{ HostPort: port.toString() }] },
                    RestartPolicy: { Name: "always" }
                },
                Cmd: ["node", "src/server.js"]
            }).then(container => container.start());
        }
    }
}

startContainers().catch(console.error);
