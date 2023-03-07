export default ({ app }, inject) => {
    inject('gridColsTransformer', (breakpoint) => {
        switch(breakpoint) {
            case 'xs':
                return 'col-span-12';
            case 'sm':
                return 'col-span-12';
            case 'md':
                return 'col-span-6';
            case 'lg':
                return 'col-span-6';
            case 'xl':
                return 'col-span-6'
        }
    })

    inject('gridLargeColsTransformer', (breakpoint) => {
        switch(breakpoint) {
            case 'xs':
                return 'col-span-12';
            case 'sm':
                return 'col-span-12';
            case 'md':
                return 'col-span-6';
            case 'lg':
                return 'col-span-12';
            case 'xl':
                return 'col-span-6'
        }
    })
}