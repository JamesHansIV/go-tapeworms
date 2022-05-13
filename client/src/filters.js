

export const filterScolex = (worms, filter) => {
    switch(filter) {
        case 'bothria':
            return worms.filter(worms => worms.num_bothria != null);
            break;      
        case 'bothridia':
            return worms.filter(worms => worms.num_bothridia != null);
            break;
        case 'suckers':
            return worms.filter(worms => worms.num_suckers != null);
            break;
        default:
            return worms;
    }
}

export const filterParasiteOf = (worms, filter) => {
    switch(filter) {
        case 'stingrays':
            return worms.filter(worms => worms.parasite_of == 'stingrays');
            break;      
        case 'eagle-rays':
            return worms.filter(worms => worms.parasite_of == 'eagle rays');
            break;
        case 'sharks':
            return worms.filter(worms => worms.parasite_of == 'sharks');
            break;
        default:
            return worms;
    }
}

export const filterApicalOrgan = (worms, filter) => {
    switch(filter) {
        case 'true':
            return worms.filter(worms => worms.apical_organ_color);
            break;      
        case 'false':
            return worms.filter(worms => !worms.apical_organ_color);
            break;
        default:
            return worms;
    }
}

export const filterLength = (worms, min, max) => {
    if(!!worms.max_length) {
        return worms.filter(worms => worms.min_lenth <= max);
    } else {
        return worms.filter(worms => worms.min_length <= max && min <= worms.max_length);
    };
}

export const filterTestes = (worms, min, max) => {
    if(!!worms.max_testes) {
        return worms.filter(worms => worms.min_testes <= max);
    } else {
        return worms.filter(worms => worms.min_testes <= max && min <= worms.max_testes);
    };
}