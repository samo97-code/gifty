export const productDefaultLimit = 8

export const sortBy = [
    {
        "id": 1,
        "name": "Order Date Desc",
        "value": 'order_date',
        "order": 'desc'
    },
    {
        "id": 2,
        "name": "Order Date Asc",
        "value": 'order_date',
        "order": 'asc'
    },
    {
        "id": 3,
        "name": "Price($): High to Low",
        "value": 'shop_price',
        "order": 'desc'
    },
    {
        "id": 4,
        "name": "Price($): Low to High",
        "value": 'shop_price',
        "order": 'asc'
    },
]

export const statuses = [
    {
        "id": 1,
        "name": "Ordered",
        "color": '#6c757d'
    },
    {
        "id": 2,
        "name": "Arrived",
        "color": '#28a745'
    },
    {
        "id": 3,
        "name": "Sold",
        "color": '#dc3545'
    },
    {
        "id": 4,
        "name": "Used",
        "color": '#007bff'
    },
    {
        "id": 5,
        "name": "Wishlist",
        "color": '#cb8122'
    },
]

export const shops = [
    {
        "id": 1,
        "name": "6pm",
        "url": "https://www.6pm.com/"
    },
    {
        "id": 2,
        "name": "jomashop",
        "url": "https://www.jomashop.com/"
    },
    {
        "id": 3,
        "name": "wildberries",
        "url": "https://www.wildberries.ru/"
    },
    {
        "id": 4,
        "name": "Ebay",
        "url": "https://www.ebay.com/"
    },
    {
        "id": 5,
        "name": "Amazon",
        "url": "https://www.amazon.com/"
    }
]

export const sizes = [
    {
        "id": 1,
        "name": "5ml",
    },
    {
        "id": 2,
        "name": "25ml",
    },
    {
        "id": 3,
        "name": "30ml",
    },
    {
        "id": 4,
        "name": "50ml",
    },
    {
        "id": 5,
        "name": "75ml",
    },
    {
        "id": 6,
        "name": "80ml",
    },
    {
        "id": 7,
        "name": "100ml",
    },
    {
        "id": 8,
        "name": "200ml",
    },
]

export const socials = [
    {id: 1, label: 'Instagram'},
    {id: 2, label: 'Facebook'},
]

export const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029,2030]

export const allHeaders =  [
    {id: 1, label: 'Name', value: 'title'},
    {id: 2, label: 'Brand', value: 'brand'},
    {id: 3, label: 'Product Url', value: 'product_url'},
    {id: 4, label: 'Shop Name', value: 'shop'},
    {id: 21, label: 'Ebay Seller', value: 'ebay_seller'},
    {id: 5, label: 'Status', value: 'status'},
    {id: 6, label: 'Category', value: 'category'},
    {id: 23, label: 'Watch Model', value: 'model'},
    {id: 7, label: 'In Stock', value: 'is_in_stock'},
    {id: 8, label: 'Size', value: 'size'},
    {id: 9, label: 'Quantity', value: 'quantity'},
    {id: 10, label: 'Shop Price($)', value: 'shop_price'},
    {id: 11, label: 'Dollar Rate', value: 'dollar_rate'},
    {id: 12, label: 'Shop Price Converted(դր)', value: 'shop_price_arm'},
    {id: 13, label: 'Order Date', value: 'order_date'},
    {id: 14, label: 'Order Number', value: 'order_number'},
    {id: 15, label: 'Arrived Date', value: 'arrived_date'},
    {id: 16, label: 'Onex Price(դր)', value: 'shipment_price'},
    {id: 17, label: 'Gifty Price(դր)', value: 'gifty_price'},
    {id: 18, label: 'Clean Income(դր)', value: 'clean_income'},
    {id: 19, label: 'Sold', value: 'is_sold'},
    {id: 20, label: 'Used', value: 'is_used'},
    {id: 22, label: 'Action', value: 'action'},
]