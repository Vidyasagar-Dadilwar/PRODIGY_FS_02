const Employee = require("../models/Employee");

exports.createEmployee = async (req, res) => {
  const { name, email, position, salary } = req.body;
  try {
    const newEmployee = new Employee({ name, email, position, salary });
    await newEmployee.save();
    res.json(newEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, position, salary } = req.body;
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, email, position, salary },
      { new: true }
    );
    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    await Employee.findByIdAndDelete(id);
    res.json({ msg: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};