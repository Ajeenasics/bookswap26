const fs = require('fs');

let content = fs.readFileSync('c:\\Users\\mepra\\OneDrive\\Desktop\\sristi workspace\\bookswap\\Book-Swap\\client\\src\\Components\\Readers\\ReaderSignin.jsx', 'utf8');

const fields = [
  { name: 'firstname', placeholder: 'First Name' },
  { name: 'lastname', placeholder: 'Last Name' },
  { name: 'email', placeholder: 'Email', type: 'email' },
  { name: 'password', placeholder: 'Password', type: 'password', showProp: 'showPassword', setProp: 'setShowPassword' },
  { name: 'confirmpassword', placeholder: 'Confirm Password', type: 'password', showProp: 'showConfirmPassword', setProp: 'setShowConfirmPassword' },
  { name: 'street', placeholder: 'Street' },
  { name: 'city', placeholder: 'City' },
  { name: 'state', placeholder: 'State' },
  { name: 'district', placeholder: 'District' },
  { name: 'pincode', placeholder: 'Pincode', type: 'number' },
  { name: 'mobile', placeholder: 'Contact', type: 'number', extraClass: 'w-50' }
];

fields.forEach(f => {
  // We locate the div wrapper for each field
  let regex;
  if (f.name === 'password' || f.name === 'confirmpassword') {
    regex = new RegExp(`(<input\\s+type=\\{${f.showProp}\\s+\\?\\s+"text"\\s+:\\s+"password"\\}\\s+placeholder="${f.placeholder}"\\s+name="${f.name}"[\\s\\S]*?onChange=\\{handleChange\\}\\s+onBlur=\\{handleBlur\\}\\s+style=\\{\\{ paddingRight: "40px" \\}\\}\\s+\\/>)`, 'g');
    content = content.replace(regex, (match) => {
        return `<div className="form-floating">\n                    <input\n                      type={${f.showProp} ? "text" : "password"}\n                      className="form-control"\n                      id="${f.name}"\n                      placeholder="${f.placeholder}"\n                      name="${f.name}"\n                      value={values.${f.name}}\n                      onChange={handleChange}\n                      onBlur={handleBlur}\n                      style={{ paddingRight: "40px", height: "58px", borderRadius: "7px" }}\n                    />\n                    <label htmlFor="${f.name}">${f.placeholder}</label>\n                  </div>`;
    });
  } else {
    regex = new RegExp(`(<input\\s+type="${f.type || 'text'}"\\s+placeholder="${f.placeholder}"\\s+name="${f.name}"\\s+value=\\{values\\.${f.name}\\}\\s+onChange=\\{handleChange\\}\\s+onBlur=\\{handleBlur\\}\\s*\\/>)`, 'g');
    content = content.replace(regex, (match) => {
        return `<div className="form-floating">\n                    <input\n                      type="${f.type || 'text'}"\n                      className="form-control"\n                      id="${f.name}"\n                      placeholder="${f.placeholder}"\n                      name="${f.name}"\n                      value={values.${f.name}}\n                      onChange={handleChange}\n                      onBlur={handleBlur}\n                      style={{ height: "58px", borderRadius: "7px" }}\n                    />\n                    <label htmlFor="${f.name}">${f.placeholder}</label>\n                  </div>`;
    });
  }
});

// also fix top for eye icons
content = content.replace(/top: "15px"/g, 'top: "20px"');

fs.writeFileSync('c:\\Users\\mepra\\OneDrive\\Desktop\\sristi workspace\\bookswap\\Book-Swap\\client\\src\\Components\\Readers\\ReaderSignin.jsx', content);
console.log('ReaderSignin updated.');
