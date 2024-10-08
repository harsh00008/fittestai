const fs = require('fs');
const path = require('path');

function setupEnvironment() {
  console.log('Setting up environment...');

  // Ensure the .gradle directory exists
  const gradleDir = path.join(process.env.HOME, '.gradle');
  if (!fs.existsSync(gradleDir)) {
    fs.mkdirSync(gradleDir, { recursive: true });
  }

  // Create or update gradle.properties
  const gradlePropertiesPath = path.join(gradleDir, 'gradle.properties');
  const gradleProperties = `
org.gradle.jvmargs=-Xmx2048m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
org.gradle.parallel=true
org.gradle.configureondemand=true
org.gradle.daemon=true
  `.trim();

  fs.writeFileSync(gradlePropertiesPath, gradleProperties);

  console.log('Environment setup complete.');
}

setupEnvironment();