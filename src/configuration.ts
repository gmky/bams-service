import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { mergeWith } from 'lodash';

export default () => {
  let envConfig = {};
  const fileName = `application-${process.env.NODE_ENV || 'dev'}.yaml`;
  Object.entries(process.env)
    .filter(([key, value]) => key.startsWith('NESTJS_'))
    .map(([key, value]) => ({
      key: key.substring(7).replace('_', '.').toLowerCase(),
      value,
    }))
    .map((item) => {
      let nestedObj;
      let count = 0;
      const result = item.key.split('.').reduce((a, value) => {
        count++;
        if (typeof nestedObj == 'object') {
          if (count == item.key.split('.').length) {
            nestedObj = nestedObj[value] = +item.value || item.value;
          } else {
            nestedObj = nestedObj[value] = {};
          }
        } else {
          nestedObj = a[value] = {};
        }
        return a;
      }, {});
      return result;
    })
    .forEach((item) => {
      envConfig = mergeWith({}, envConfig, item);
    });
  const yamlConfig = yaml.load(
    readFileSync(join(__dirname, 'resources/config', fileName), 'utf8'),
  ) as Record<string, any>;
  const lastResult = mergeWith({}, yamlConfig, envConfig);
  return lastResult;
};
