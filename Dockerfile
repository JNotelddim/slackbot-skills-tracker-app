FROM public.ecr.aws/lambda/nodejs:16
# WORKDIR /usr/src/app

# Assumes your function is named "app.js", and there is a package.json file in the app directory 
# COPY package.json ./
# COPY app.js ./
COPY app.js package.json  ${LAMBDA_TASK_ROOT}/
COPY ./* ${LAMBDA_TASK_ROOT}/

# Install NPM dependencies for function
RUN npm install

ENTRYPOINT ["/usr/local/bin/npx", "aws-lambda-ric"]

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "app.handler" ]