export const venueSchema: any = {
    title: "Data",
    description: "Data venue schema",
    type: "object",
    properties: {
        id: {type: "integer"},
        name: {type: "string"},
        surface: {type: "string", "nullable": true},
        address: {type: "string", "nullable": true},
        city: {type: "string"},
        capacity: {type: "integer"},
        image_path: {type: "string"},
        coordinates: {type: "string"}
    }
}

export const venuesSchema: any = {
    type: "array",
    items: venueSchema
}