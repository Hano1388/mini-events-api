import NodeGeocoder from 'node-geocoder';

const options: NodeGeocoder.Options = {
    provider: 'mapquest',
    apiKey: 'QGdf3Q7iRYLhUpY71fGScvFjN0OAkILa',
    formatter: null
}

export const geocoder = NodeGeocoder(options);

