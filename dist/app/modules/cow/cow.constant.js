"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowFiltersableFields = exports.cowSearchableFields = exports.categories = exports.labels = exports.locations = void 0;
exports.locations = [
    'Dhaka',
    'Chattogram',
    'Barishal',
    'Rajshahi',
    'Sylhet',
    'Comilla',
    'Rangpur',
    'Mymensingh',
];
exports.labels = ['for sale', 'sold out'];
exports.categories = ['Beef', 'Dairy', 'DualPurpose'];
exports.cowSearchableFields = ['location', 'breed', 'category'];
exports.cowFiltersableFields = [
    'searchTerm',
    'location',
    'breed',
    'label',
    'category',
    'minPrice',
    'maxPrice',
];
