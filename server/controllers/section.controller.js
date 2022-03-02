const { validationResult } = require("express-validator");
const SectionService = require('../services/section.service')
const { errorHandler } = require("../utils/errorHandler");

exports.get = async function (req, res) {
    try {
        const { page, count } = req.query

        const news = await SectionService.get(count, page)

        res.json(news)
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.getDetail = async function (req, res) {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors[0].message
            })
        }

        const { id } = req.params

        const news = await SectionService.getDetail(id)
        res.json(news)
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.add = async function (req, res) {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Отсутствуют обязательные данные для добавления кружка'
            })
        }

        const { name, previewText, content, supervisor, schedule, achievements, logo } = req.body
        const {supervisorPhoto, ...contentImages } = req.files

        // if (!await SectionService.add(name, previewText, content, supervisor, schedule, achievements, logo,
        //     supervisorPhoto, contentImages)) {
        //
        //     throw Error()
        // }

        res.status(201).json({ message: 'Кружок успешно добавлен' })
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.update = async function (req, res) {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Отсутствуют обязательные данные для редактирования кружка'
            })
        }

        const { id } = req.params
        const { name, previewText, content, supervisor, schedule, achievements } = req.body
        const { logo, supervisorPhoto, ...contentImages } = req.files

        if (!await SectionService.update(name, previewText, content, supervisor, schedule, achievements, logo,
            supervisorPhoto, contentImages)) {
            throw Error()
        }

        res.status(201).json({ message: 'Кружок успешно обновлен' })
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.delete = async function (req, res) {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Отсутствуют обязательные данные для удаления кружка'
            })
        }

        const { id } = req.params

        await SectionService.delete(id)

        return res.json({ message: 'Кружок успешно удален' })
    } catch (e) {
        errorHandler(e, res)
    }
}