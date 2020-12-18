export function removeDuplicateById(array, attr) {
  const result = [];
  array.forEach((value) => {
    const id = value[attr];

    if (!containsAttrByValue(result, attr, id)) {
      result.push(value);
    }
  });
  return result;
}

export function containsAttrByValue(array, attr, value) {
  for (let item of array) {
    const id = item[attr];

    if (id === value) return true;
  }
  return false;
}

export function replaceAllById(array, attr, object) {
  let result = [];
  for (let item of array) {
    const id = item[attr];
    const objectId = object[attr];

    if (id === objectId) {
      result.push(object);
    } else {
      result.push(item);
    }
  }
  return result;
}

export function replaceAllAttrById(array, attr, attrToReplace, object) {
  let result = [];
  for (let item of array) {
    const id = item[attr];
    const objectId = object[attr];

    if (id === objectId) {
      const newItem = {
        ...item,
      };
      newItem[attrToReplace] = object[attrToReplace];

      result.push(newItem);
    } else {
      result.push(item);
    }
  }
  return result;
}
