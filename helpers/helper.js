const bcryptjs = require('bcryptjs');
const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "October", "November", "Desember"];

class Helper {
    static generatePassword(password) {
        const saltRounds = 10;

        return bcryptjs.hashSync(password, saltRounds);
    }

    static validatePassword(password, dbPassword) {
        return bcryptjs.compareSync(password, dbPassword);
    }


    static getErrors(query) {
        let {errors} = query;
        if (!errors) {
            errors = [];
        } else {
            errors = errors.split(',')
        }

        return errors;
    }

    static setErrors(res, error, url) {
        if (error?.name === "SequelizeValidationError") {
            error = error.errors.map(item => {
                return item.message;
            })

            res.redirect(`${url}?errors=${error}`)
        } else if (error?.name === "validation") {
            res.redirect(`${url}?errors=${error.errors}`)
        } else if (error?.name === "SequelizeForeignKeyConstraintError") {
            res.redirect(`${url}?errors=Data Tidak Bisa Dihapus`)
        } else {
            res.send(error);
        }
    }

    static formatDate(date) {
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };

        date = date.toLocaleString("id-ID", options);

        return date;
    }

    static currencyFormat(balance){
        let currency = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0
        });

        return currency.format(balance)
    }

}


module.exports = Helper