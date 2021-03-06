const assert = require("assert");
const path = require("path");
const fs = require("fs");
const { ConfigLoader } = require("../ConfigLoader");

const creatInfraFromFile = async ({ infraFileName, config, stage }) => {
  const InfraCode = require(infraFileName);
  if (!InfraCode.createStack) {
    throw { code: 400, message: `no createStack provided` };
  }

  const infra = await InfraCode.createStack({ config: { ...config, stage } });
  if (!infra) {
    throw { code: 400, message: `no infra provided` };
  }
  const { provider, resources } = infra;
  if (resources && provider) {
    provider.register({ resources });
  }
  return infra;
};

const resolveFilename = ({ fileName, defaultName }) =>
  path.resolve(process.cwd(), fileName ? fileName : defaultName);

const checkFileExist = ({ fileName }) => {
  if (!fs.existsSync(fileName)) {
    const message = `Cannot open file ${fileName}`;
    console.log(message);
    throw { code: 422, message };
  }
};

const requireConfig = ({ fileName, stage }) => {
  if (!fileName) {
    return ConfigLoader({ stage });
  }
  checkFileExist({ fileName });

  const configFileNameFull = path.resolve(process.cwd(), fileName);
  checkFileExist({ fileName: configFileNameFull });
  const config = require(configFileNameFull);
  return config;
};

exports.createInfra = ({ infraFileName, configFileName, stage = "dev" }) => {
  const infraFileNameFull = resolveFilename({
    fileName: infraFileName,
    defaultName: "iac.js",
  });
  //console.log(`Using ${infraFileNameFull}`);
  checkFileExist({ fileName: infraFileNameFull });

  const config = requireConfig({ fileName: configFileName, stage });
  return creatInfraFromFile({
    infraFileName: infraFileNameFull,
    config,
    stage,
  });
};
