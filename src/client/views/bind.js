export function bindValue(viewmodel, key) {
  return function (e) {
    viewmodel[key] = e.target.value;
  }
}

export function bindChecked(viewmodel, key) {
  return function (e) {
    viewmodel[key] = e.target.checked;
  }
}

export function bindSelected(viewmodel, key) {
  return function (e) {
    viewmodel[key] = e.target.selected;
  }
}

export default function bind(attribute, viewmodel, propertyKey) {
  var props = {};
  props[attribute] = viewmodel[propertyKey];
  props.onChange = (e) => viewmodel[propertyKey] = e.target[attribute];
  return props;
};
