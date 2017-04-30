function parseData(map_string) {
    var parsed = map_string.split(/,|\n/);
    return {
        width: parseInt(parsed[0])
        , height: parseInt(parsed[1])
        , data: parsed.slice(2).join('').replace(/-/g, ' ')
    }
}

function drawMap(map_data) {
    var regexp = new RegExp('.{' + map_data.width + '}', 'g');
    console.log(map_data.data.match(regexp).slice(0, map_data.height).join('\n'));
}