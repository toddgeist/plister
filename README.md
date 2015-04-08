# plister
a java script module to convert back and forth between JSON and a nested property list format. Useful to parse and send HTTP requests data to and from devices that can't handle JSON. Sadly, there are some of these

This was created for use with FileMaker Go. There are a set of Custom Functions which can quickly and safely parse this data.

### Creating JSON with array properties
If you want to create some JSON that has an array for one of it's properties, name the property with a "#" prefix.

This # prefix is also added to any JSON property names that are converted to pLists

