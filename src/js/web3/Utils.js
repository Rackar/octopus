import Web3 from 'web3';

function countToWei(number = 1) {
  //FIXED 修复了js浮点数精度问题。 18*0.001 === 0.01800000000002
  return Web3.utils.toWei((Math.round(number) / 1000).toString());
}
function weiToCount(amount = '') {
  return Web3.utils.fromWei(amount);
}

// 全局监视对象变化的断点
// 用法 breakOn(window.ethereum, 'selectedAddress');
function breakOn(obj, propertyName, mode, func) {
  // this is directly from https://github.com/paulmillr/es6-shim
  function getPropertyDescriptor(obj, name) {
    var property = Object.getOwnPropertyDescriptor(obj, name);
    var proto = Object.getPrototypeOf(obj);
    while (property === undefined && proto !== null) {
      property = Object.getOwnPropertyDescriptor(proto, name);
      proto = Object.getPrototypeOf(proto);
    }
    return property;
  }

  function verifyNotWritable() {
    if (mode !== 'read')
      throw "This property is not writable, so only possible mode is 'read'.";
  }

  var enabled = true;
  var originalProperty = getPropertyDescriptor(obj, propertyName);
  var newProperty = { enumerable: originalProperty.enumerable };

  // write
  if (originalProperty.set) {
    // accessor property
    newProperty.set = function (val) {
      if (enabled && (!func || (func && func(val)))) debugger;

      originalProperty.set.call(this, val);
    };
  } else if (originalProperty.writable) {
    // value property
    newProperty.set = function (val) {
      if (enabled && (!func || (func && func(val)))) debugger;

      originalProperty.value = val;
    };
  } else {
    verifyNotWritable();
  }

  // read
  newProperty.get = function (val) {
    if (enabled && mode === 'read' && (!func || (func && func(val)))) debugger;

    return originalProperty.get
      ? originalProperty.get.call(this, val)
      : originalProperty.value;
  };

  Object.defineProperty(obj, propertyName, newProperty);

  return {
    disable: function () {
      enabled = false;
    },

    enable: function () {
      enabled = true;
    },
  };
}

export { countToWei, weiToCount };
