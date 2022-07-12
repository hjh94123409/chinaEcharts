
export interface ChinaAdd {
    confirm: number;
    heal: number;
    dead: number;
    nowConfirm: number;
    suspect: number;
    nowSevere: number;
    importedCase: number;
    noInfect: number;
    localConfirm: number;
    noInfectH5: number;
    localConfirmH5: number;
}

export interface ShowAddSwitch {
    nowSevere: boolean;
    noInfect: boolean;
    all: boolean;
    confirm: boolean;
    dead: boolean;
    importedCase: boolean;
    localConfirm: boolean;
    localinfeciton: boolean;
    suspect: boolean;
    heal: boolean;
    nowConfirm: boolean;
}

export interface Today {
    confirm: number;
    isUpdated: boolean;
}

export interface Total {
    showHeal: boolean;
    mtime: string;
    nowConfirm: number;
    dead: number;
    continueDayZeroLocalConfirmAdd: number;
    continueDayZeroLocalConfirm: number;
    adcode: string;
    showRate: boolean;
    heal: number;
    mediumRiskAreaNum: number;
    confirm: number;
    wzz: number;
    provinceLocalConfirm: number;
    highRiskAreaNum: number;
}

export interface Today {
    local_confirm_add: number;
    confirm: number;
    confirmCuts: number;
    isUpdated: boolean;
    wzz_add: string;
}

export interface Total {
    showRate: boolean;
    wzz: number;
    mediumRiskAreaNum: number;
    highRiskAreaNum: number;
    nowConfirm: number;
    showHeal: boolean;
    adcode: string;
    confirm: number;
    heal: number;
    continueDayZeroLocalConfirm: number;
    mtime: string;
    dead: number;
    provinceLocalConfirm: number;
    continueDayZeroLocalConfirmAdd: number;
}

export interface Children {
    name: string;
    adcode: string;
    date: string;
    today: Today;
    total: Total;
}

export interface Today {
    dead_add: number;
    confirm: number;
    confirmCuts: number;
    isUpdated: boolean;
    tip: string;
    wzz_add: number;
    local_confirm_add: number;
    abroad_confirm_add: number;
}

export interface Total {
    continueDayZeroConfirm: number;
    mtime: string;
    confirm: number;
    dead: number;
    showRate: boolean;
    provinceLocalConfirm: number;
    mediumRiskAreaNum: number;
    nowConfirm: number;
    showHeal: boolean;
    wzz: number;
    highRiskAreaNum: number;
    continueDayZeroConfirmAdd: number;
    heal: number;
    continueDayZeroLocalConfirmAdd: number;
    adcode: string;
}

export interface Children {
    children: Children[];
    name: string;
    adcode: string;
    date: string;
    today: Today;
    total: Total;
}

export interface AreaTree {
    name: string;
    today: Today;
    total: Total;
    children: Children[];
}

export interface ChinaTotal {
    localConfirmH5: number;
    nowLocalWzz: number;
    deadAdd: number;
    highRiskAreaNum: number;
    localConfirm: number;
    importedCase: number;
    showLocalConfirm: number;
    showlocalinfeciton: number;
    mtime: string;
    nowConfirm: number;
    heal: number;
    suspect: number;
    confirmAdd: number;
    mediumRiskAreaNum: number;
    confirm: number;
    nowSevere: number;
    local_acc_confirm: number;
    localWzzAdd: number;
    localConfirmAdd: number;
    mRiskTime: string;
    dead: number;
    noInfect: number;
    noInfectH5: number;
}

export interface Diseaseh5Shelf {
    chinaAdd: ChinaAdd;
    isShowAdd: boolean;
    showAddSwitch: ShowAddSwitch;
    areaTree: AreaTree[];
    lastUpdateTime: string;
    chinaTotal: ChinaTotal;
}

export interface LocalCityNCOVDataList {
    date: string;
    mtime: string;
    local_confirm_add: number;
    mediumRiskAreaNum: number;
    highRiskAreaNum: number;
    isSpecialCity: boolean;
    province: string;
    city: string;
    adcode: string;
    isUpdated: boolean;
    local_wzz_add: string;
}

export interface RootObject {
    diseaseh5Shelf: Diseaseh5Shelf;
    localCityNCOVDataList: LocalCityNCOVDataList[];
}