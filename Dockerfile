FROM node:20.12.2

# Create working directory
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install app dependencies
RUN yarn

# Copy necessary files to the working directory
# COPY ./.env ./.env
# COPY ./next.config.js ./next.config.js
# COPY ./tailwind.config.js ./tailwind.config.js
# COPY ./postcss.config.js ./postcss.config.js
# COPY ./src ./src
COPY . .

# Build the app
RUN yarn build

# Expose port 3001 run the app
EXPOSE 3001

# Run application Next.js
CMD ["yarn", "start"]
