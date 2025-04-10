// 数字与验证内容的映射（1-109）
const numberMap = {};

// 默认映射：数字对应"key"+数字
for (let i = 1; i <= 109; i++) {
    numberMap[i] = "key" + i;
}

// 特殊映射配置
const specialMappings = [
    { numbers: [1,10,27,34,36,37,40,41,45,46,47,48,70,71,72,73,88,89,90,91,92,93,94,95], value: "GND" },
    { numbers: [7], value: "Powerkey" },
    { numbers: [9], value: "ADC0" },
    { numbers: [11], value: "USIM_DAT" },
    { numbers: [12], value: "USIM_RST" },
    { numbers: [13], value: "USIM_CLK" },
    { numbers: [14], value: "USIM_VDD" },
    { numbers: [15], value: "RESET" },
    { numbers: [16], value: "GPIO27" },
    { numbers: [17], value: "UART1_RXD" },
    { numbers: [18], value: "UART1_TXD" },
    { numbers: [19], value: "GPIO22" },
    { numbers: [20], value: "GPIO24" },
    { numbers: [22], value: "GPIO1" },
    { numbers: [23], value: "GPIO2" },
    { numbers: [24], value: "VDD_EXT" },
    { numbers: [25], value: "GPIO26" },
    { numbers: [26], value: "GPIO33" },
    { numbers: [28], value: "UART2_RXD" },
    { numbers: [29], value: "UART2_TXD" },
    { numbers: [30], value: "GPIO29" },
    { numbers: [31], value: "GPIO30" },
    { numbers: [32], value: "GPIO31" },
    { numbers: [33], value: "GPIO32" },
    { numbers: [35], value: "LTE_ANT" },
    { numbers: [38], value: "DBG_RXD" },
    { numbers: [39], value: "DBG_TXD" },
    { numbers: [42], value: "VBAT" },
    { numbers: [43], value: "VBAT" },
    { numbers: [49], value: "LCD_RST" },
    { numbers: [50], value: "LCD_SDA" },
    { numbers: [51], value: "LCD_RS" },
    { numbers: [52], value: "LCD_CS" },
    { numbers: [53], value: "LCD_CLK" },
    { numbers: [54], value: "CAM_MCLK" },
    { numbers: [55], value: "CAM_RX0" },
    { numbers: [56], value: "CAM_RX1" },
    { numbers: [57], value: "UART3_TXD" },
    { numbers: [58], value: "UART3_RXD" },
    { numbers: [59], value: "USB_DP" },
    { numbers: [60], value: "USB_DM" },
    { numbers: [61], value: "VBUS" },
    { numbers: [62], value: "USIM2_CLK" },
    { numbers: [63], value: "USIM2_RST" },
    { numbers: [64], value: "USIM2_DAT" },
    { numbers: [65], value: "USIM2_VDD" },
    { numbers: [66], value: "I2C_SDA" },
    { numbers: [67], value: "I2C_SCL" },
    { numbers: [76], value: "ADC3" },
    { numbers: [77], value: "ADC2" },
    { numbers: [78], value: "GPIO28" },
    { numbers: [79], value: "USIM_DET" },
    { numbers: [80], value: "CAM_BCLK" },
    { numbers: [81], value: "CAM_CS" },
    { numbers: [82], value: "USB_BOOT" },
    { numbers: [83], value: "SPI_CS" },
    { numbers: [84], value: "SPI_MISO" },
    { numbers: [85], value: "SPI_MOSI" },
    { numbers: [86], value: "SPI_CLK" },
    { numbers: [96], value: "ADC1" },
    { numbers: [97], value: "GPIO16" },
    { numbers: [99], value: "GPIO23" },
    { numbers: [100], value: "IO_VOLT_SET" },
    { numbers: [101], value: "WAKEUP0" },
    { numbers: [102], value: "GPIO20" },
    { numbers: [106], value: "GPIO25" },
    { numbers: [107], value: "GPIO21" },
    { numbers: [2,3,4,5,6,8,21,44,68,69,74,75,87,98,103,104,105,108,109], value: "R" } // 数字2-6都对应"R"
];

// 应用特殊映射
specialMappings.forEach(mapping => {
    mapping.numbers.forEach(num => {
        numberMap[num] = mapping.value;
    });
});

// 当前显示的数字
let currentNumber = null;
let isLoading = false;

// DOM元素
const randomBtn = document.getElementById('randomBtn');
const verifyBtn = document.getElementById('verifyBtn');
const numberDisplay = document.getElementById('numberDisplay');
const userInput = document.getElementById('userInput');
const resultDisplay = document.getElementById('result');
const errorImage = document.getElementById('errorImage');
const container = document.querySelector('.container');

// 生成随机数
function generateRandomNumber() {
    return Math.floor(Math.random() * 109) + 1; // 1-109
}

// 显示加载动画
function showLoading() {
    isLoading = true;
    container.classList.add('loading');
}

// 隐藏加载动画
function hideLoading() {
    isLoading = false;
    container.classList.remove('loading');
}

// 随机按钮点击事件
randomBtn.addEventListener('click', () => {
    if (isLoading) return;
    
    showLoading();
    setTimeout(() => {
        currentNumber = generateRandomNumber();
        numberDisplay.textContent = currentNumber;
        userInput.value = '';
        resultDisplay.textContent = '';
        resultDisplay.className = '';
        errorImage.style.display = 'none';
        userInput.focus();
        hideLoading();
    }, 500);
});

// 验证按钮点击事件
function verifyInput() {
    if (!currentNumber) {
        resultDisplay.textContent = '请先点击"随机数字"按钮';
        return;
    }

    const inputValue = userInput.value.trim();
    if (!inputValue) {
        resultDisplay.textContent = '请输入验证内容';
        return;
    }

    const correctAnswer = numberMap[currentNumber];
    if (inputValue.toLowerCase() === correctAnswer.toLowerCase()) {
        resultDisplay.textContent = '正确!';
        resultDisplay.className = 'correct';
    } else {
        resultDisplay.textContent = `错误! 正确答案是: ${correctAnswer}`;
        resultDisplay.className = 'error';
        errorImage.style.display = 'block';
    }
}

verifyBtn.addEventListener('click', verifyInput);

// 输入框回车键事件
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        verifyInput();
    }
});
